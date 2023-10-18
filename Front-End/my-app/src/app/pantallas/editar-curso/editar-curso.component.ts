import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CursoI } from '../../modelos/curso.interface';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Tema } from 'src/app/modelos/tema.model';
import {AlertasService} from '../../servicios/alertas/alertas.service';
import { ResponseI } from 'src/app/modelos/response.interface';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-editar-curso',
  templateUrl: './editar-curso.component.html',
  styleUrls: ['./editar-curso.component.css']
})
export class EditarCursoComponent implements OnInit {
    
  temas: Tema[] = []; // para almacenar los temas

  
  
  constructor(private alertas: AlertasService, private activerouter: ActivatedRoute, private router: Router, private api: ApiService) {
    
   }

 
  datosCurso?: CursoI;
  editarForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    fechaInicio: new FormControl('', Validators.required),
    idDocente: new FormControl('', Validators.required),
    tema: new FormControl('', Validators.required),
    duracion: new FormControl('', Validators.required)  // Añade este control de formulario
  });

  ngOnInit(): void {

    
    
    let cursoid = this.activerouter.snapshot.paramMap.get('id');

    this.api.getSingleCurso(cursoid).subscribe(data => {
      this.datosCurso = data;
      this.editarForm.patchValue({
        'id': this.datosCurso && this.datosCurso.id ? this.datosCurso.id.toString() : '',
        'nombre': this.datosCurso && this.datosCurso.nombre || '',
        'fechaInicio': this.formatDate(data.fechaInicio),
        'idDocente': this.datosCurso && this.datosCurso.idDocente ? this.datosCurso.idDocente.toString() : '',
        'tema': this.datosCurso && this.datosCurso.tema ? this.datosCurso.tema.toString() : '',
        'duracion': this.datosCurso.tema?.duracion && this.datosCurso.tema.duracion ? this.datosCurso.tema.duracion.toString() : ''
      
      });
      console.log(this.editarForm.value);
    });

    this.api.getTemas().subscribe(
      
     
      data => this.temas = data,
            error => this.alertas.showError( 'Error')
          );

    
  }
  public minDate: string = '2023-10-18';
  
  private convertirStringATema(temaString: string | null | undefined): Tema {
    // Aquí va tu lógica para convertir un string a un Tema.
    // Devuelve un objeto Tema predeterminado si temaString es null o undefined.
    if (temaString === null || temaString === undefined) {
      return new Tema({ nombre: "Nombre predeterminado" });
    }
    // Supongamos que tu string representa el nombre del tema.
    return new Tema({ nombre: temaString });
  }
  
  formatDate(date: any): string {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();
    let seconds = '' + d.getSeconds();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;
    if (seconds.length < 2) seconds = '0' + seconds;
  
    return [year, month, day].join('-') + 'T' + [hours, minutes, seconds].join(':');
  }
  
  

  public postForm(form: Partial<{id: string | null; nombre: string | null; fechaInicio: string | null; idDocente: string | null; tema: string | null; duracion: string | null; }>) {
    
    
    let id: number | undefined = form.id !== null ? Number(form.id) : undefined;
    let nombre: string | undefined = form.nombre !== null ? form.nombre : undefined;
    let tema: Tema | undefined = this.convertirStringATema(form.tema);
    
    
    let fechaInicio: Date | undefined = form.fechaInicio ? new Date(form.fechaInicio) : undefined;

    let idDocente: number | undefined = form.idDocente !== null ? Number(form.idDocente) : undefined;

    let duracion: number | undefined = form.duracion !== null ? Number(form.duracion) : undefined;
    
    

    if (fechaInicio) {
      const fechaInicioFormatted = this.formatDate(fechaInicio);
    }
    
    
    
    if (!duracion) {
      this.alertas.showError( 'Error');
      return;
    }

    
    

    // Asegúrate de que `tema` no es `null` o `undefined` antes de intentar asignar `duracion`.
    if (tema) {
      tema.duracion = duracion;
      this.api.saveTema(tema).subscribe(
        (savedTema: Tema) => {
          // Ahora que `Tema` ha sido guardado, usa el `Tema` guardado para actualizar `Curso`.
          let cursoI: CursoI = { id: Number(form.id), nombre, fechaInicio, idDocente, tema: savedTema };
          this.actualizarCurso(cursoI);
        },
        error => {
          // Maneja errores al guardar `Tema`.
          this.alertas.showError( 'Error');
        }
      );
    } else {
      this.alertas.showError( 'Error');
    }
  }

  private actualizarCurso(curso: CursoI) {
    // Asegúrate de que el ID del curso es válido antes de intentar actualizarlo.
    if (curso.id !== undefined && curso.id !== null) {
      this.api.putCurso(curso.id, curso).subscribe(data => {
        let respuesta: ResponseI = data;
        if (respuesta.status == "ok") {
          //this.alertas.showSuccess('Datos modificados', 'Hecho');
        } else {
          this.alertas.showError('Hecho');
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.alertas.showError('Hecho');
    }
  }
  salir(){
    this.router.navigate(['dashboard']);
  }

  }
  
  
 
 
 






  


    
