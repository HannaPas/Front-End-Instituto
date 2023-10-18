import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlumnoI } from '../../modelos/alumno.interface';
import { AlumnoService } from '../../servicios/api/alumno.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasService } from '../../servicios/alertas/alertas.service';
import { ResponseI } from 'src/app/modelos/response.interface';

@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.css']
})
export class EditarAlumnoComponent implements OnInit {
  alumnos: AlumnoI[] = [];
  datosAlumno?: AlumnoI;

  editarForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required)
  });

  constructor(private alertas: AlertasService, private activerouter: ActivatedRoute, private router: Router, private api: AlumnoService) { }

  ngOnInit(): void {
    

    const alumnoid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getSingleAlumno(alumnoid).subscribe(data => {
      this.datosAlumno = data;
      this.editarForm.setValue({
        'id': this.datosAlumno?.id?.toString() || '',
        'nombre': this.datosAlumno?.nombre || '',
        'fechaNacimiento': this.datosAlumno?.fechaNacimiento?.toString() || ''
      });
    });

    this.cargarAlumnos();

    

  }



  cargarAlumnos(): void {
    this.api.getAllAlumnos().subscribe(
      data => {
        this.alumnos = data;
        console.log(data)
      },
      error => {
        console.error("Error al cargar los alumnos:", error);
        // Puedes mostrar alguna alerta o mensaje de error aquí
      }
    );
  }

  postForm(form: any) {
    const fechaNacimientoRaw = new Date(form.fechaNacimiento);
    const fechaNacimientoFormatted = fechaNacimientoRaw.toISOString().split('T')[0];


    const alumno: AlumnoI = {
      id: form.id,
      nombre: form.nombre,
      fechaNacimiento:  fechaNacimientoFormatted
    };
    this.actualizarAlumno(alumno);
  }

  private actualizarAlumno(alumno: AlumnoI) {
    if (alumno.id) {
      this.api.putAlumno(alumno.id, alumno).subscribe(data => {
        const respuesta: ResponseI = data;
        if (respuesta.status == "ok") {
          this.alertas.showSuccess('Alumno Modificado', 'Hecho');
        } else {
          this.alertas.showError('Hecho');
        }
      });
    } else {
      this.alertas.showError('Hecho');
    }
  }

  salir() {
    this.router.navigate(['alumnos']);
  }

  
}
