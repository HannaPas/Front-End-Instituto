import { Component, OnInit} from '@angular/core';
import { Material } from 'src/app/modelos/material.interfase';
import { MaterialService } from 'src/app/servicios/api/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import {CursoI} from '../../modelos/curso.interface';
import { ApiService } from 'src/app/servicios/api/api.service';

@Component({
  selector: 'app-nuevo-material',
  templateUrl: './nuevo-material.component.html',
  styleUrls: ['./nuevo-material.component.css']
})
export class NuevoMaterialComponent implements OnInit {

  // Establecer un valor predeterminado para stock
  material: Material = <Material>{
    id: 0,
    titulo: '',
    costo: 0,
    idCurso: 0,
    stock: 0,  
  };
  submitted = false;

  cursos: CursoI[] = []; 
  
  constructor(private MaterialService: MaterialService, private activerouter: ActivatedRoute, private router: Router, private api:ApiService)  { }
  ngOnInit(): void {

    this.loadCursos();
  }



  saveMaterial(): void {
    const data = {
      "id": this.material.id,
      "titulo": this.material.titulo,
      "costo": this.material.costo,
      "idCurso": this.material.idCurso,
      "stock": this.material.stock,  // Asegurarse de que "stock" está escrito correctamente aquí también
    };  
    this.MaterialService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => {
          console.error(e);
        } 
      });
  }

  newMaterial(): void {
    this.submitted = false;
    this.material = <Material>{
      titulo: '',  // corregido de 'titlo' a 'titulo'
      costo: 0,
      idCurso: 0,
      stock: 0,  // corregido "Stock" a "stock"
    };
  }

  salir(){
    this.router.navigate(['materiales']);
  }


  loadCursos(): void {
    this.api.getAllCursos().subscribe(  // Suponiendo que tienes un método getAllCursos en tu servicio
        data => {
            this.cursos = data;
        },
        error => {
            console.error("Error al cargar los cursos:", error);
        }
    );
}

}
