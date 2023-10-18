import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/modelos/material.interfase';
import { MaterialService } from 'src/app/servicios/api/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ResponseI } from 'src/app/modelos/response.interface';

import {CursoI} from '../../modelos/curso.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-editar-material',
  templateUrl: './editar-material.component.html',
  styleUrls: ['./editar-material.component.css']
})
export class EditarMaterialComponent implements OnInit {

  material: Material[] = [];
  cursos: any[] = [];
  datosMaterial?: Material;

  editarForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    costo: new FormControl('', Validators.required),
    idCurso: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
  });

  
 
  isUpdating: boolean = false;

  constructor(private api1: ApiService, private alertas: AlertasService, private activerouter: ActivatedRoute, private router: Router, private api: MaterialService) { }

  ngOnInit(): void {

    this.cargarCursos();

    const temaid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getSingleMaterial(temaid).subscribe(data => {
      this.datosMaterial = data;
      this.editarForm.setValue({
        'id': this.datosMaterial?.id?.toString() || '',
        'titulo': this.datosMaterial?.titulo || '',
        'costo': this.datosMaterial?.costo?.toString() || '',
        'idCurso': this.datosMaterial?.idCurso?.toString() || '',
        'stock': this.datosMaterial?.stock?.toString() || ''
      });
    });

    this.cargarMateriales();

    

  }



  cargarMateriales(): void {
    this.api.getAllMateriales().subscribe(
      (      data: Material[]) => {
        this.material = data;
        console.log(data)
      },
      error => {
        console.error("Error al cargar los temas:", error);
        
      }
    );
  }

  postForm(form: any) {
   


    const tema: Material = {
      id: form.id,
      titulo: form.titulo,
      costo: form.costo,
      idCurso:form.idCurso,
      stock: form.stock
    };

    this.isUpdating = true; 
    this.actualizarMaterial(form);
  }

  private actualizarMaterial(tema: Material) {
  if (tema.id) {
    this.api.putMaterial(tema.id, tema).subscribe((data: ResponseI) => {
      const respuesta: ResponseI = data;
      if (this.isUpdating) {
        if (respuesta.status == "OK") {
          this.alertas.showSuccess('Datos No Modificados', 'Error');
        } else {
          this.alertas.showError('Hecho');
          this.router.navigate(['materiales']);  
        }
      }
      this.isUpdating = false;  // Resetemos isUpdating
    },
    error => {
      if (this.isUpdating) {
        this.alertas.showError('Error');
      }
      this.isUpdating = false;  // Resetemos isUpdating en caso de error
    });
  }
}


  salir() {
    this.router.navigate(['materiales']);
  }



  eliminar() {
    const confirmation = window.confirm("¿Estás seguro que deseas eliminar?");

    if (confirmation) {
        if (this.datosMaterial && this.datosMaterial.id) {
            this.api.deleteMaterial(this.datosMaterial.id).subscribe(
                response => {
                    //mostrar una alerta indicando que se eliminó correctamente
                    //this.alertas.showError('Hecho');
                    this.router.navigate(['materiales']);  
                },
                error => {
                    this.alertas.showError('Error');
                }
            );
        } else {
            this.alertas.showError('Error');
        }
    } else {
        // Si el usuario selecciona "No", simplemente redirige a la pantalla de editar
        this.router.navigate(['editar-material/' + this.datosMaterial?.id]);
    }
}


cargarCursos(): void {
  this.api1.getAllCursos().subscribe(  
      data => {
          this.cursos = data;
      },
      error => {
          
         
console.error("Error al cargar los cursos:", error);
      }
  );
}
    }