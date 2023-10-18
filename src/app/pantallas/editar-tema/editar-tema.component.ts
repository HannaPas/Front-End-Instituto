import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/modelos/tema.model';
import { TemaService } from 'src/app/servicios/api/tema.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ResponseI } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-editar-tema',
  templateUrl: './editar-tema.component.html',
  styleUrls: ['./editar-tema.component.css']
})
export class EditarTemaComponent implements OnInit {

  alumnos: Tema[] = [];
  datosTema?: Tema;

  editarForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required)
  });
  
  isUpdating: boolean = false;

  constructor(private alertas: AlertasService, private activerouter: ActivatedRoute, private router: Router, private api: TemaService) { }

  ngOnInit(): void {
    

    const temaid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getSingleTema(temaid).subscribe(data => {
      this.datosTema = data;
      this.editarForm.setValue({
        'id': this.datosTema?.id?.toString() || '',
        'nombre': this.datosTema?.nombre || '',
        'duracion': this.datosTema?.duracion?.toString() || ''
      });
    });

    this.cargarTemas();

    

  }



  cargarTemas(): void {
    this.api.getAllTemas().subscribe(
      (      data: Tema[]) => {
        this.alumnos = data;
        console.log(data)
      },
      error => {
        console.error("Error al cargar los temas:", error);
       
      }
    );
  }

  postForm(form: any) {
   


    const tema: Tema = {
      id: form.id,
      nombre: form.nombre,
      duracion: form.duracion
    };
    this.actualizarTema(form);
  }

  private actualizarTema(tema: Tema) {
    if (tema.id) {
      this.api.putTema(tema.id, tema).subscribe((data: ResponseI) => {
        const respuesta: ResponseI = data;
        if (this.isUpdating) {
          if (respuesta.status == "OK") {
            this.alertas.showSuccess('Datos No Modificados', 'Error');
          } else {
            this.alertas.showError('Hecho');
            this.router.navigate(['materiales']);  
          }
        }
        this.isUpdating = false;  
      },
      error => {
        if (this.isUpdating) {
          this.alertas.showError( 'Error');
        }
        this.isUpdating = false; 
      });
    }
  }
  

  salir() {
    this.router.navigate(['temas']);
  }

  

  eliminar() {
    const confirmation = window.confirm("¿Estás seguro que deseas eliminar?");

    if (confirmation) {
        if (this.datosTema && this.datosTema.id) {
            this.api.deleteTema(this.datosTema.id).subscribe(
                response => {
                    //mostrar una alerta indicando que se eliminó correctamente
                    //this.alertas.showSuccess('Eliminado con éxito', 'Hecho');
                    this.router.navigate(['temas']);  
                },
                error => {
                    this.alertas.showError('Error el Tema esta referenciado a un Curso');
                    this.router.navigate(['temas']);
                }
            );
        } else {
            this.alertas.showError('Error el Tema esta referenciado a un Curso');
            this.router.navigate(['temas']);
        }
    } else {
        // Si el usuario selecciona "No", simplemente redirige a la pantalla de editar
        this.router.navigate(['editar-tema/' + this.datosTema?.id]);
    }
}

  
}
