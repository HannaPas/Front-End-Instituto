import { Component, OnInit } from '@angular/core';
import { AlumnoI } from 'src/app/modelos/alumno.interface';
import { AlumnoService } from 'src/app/servicios/api/alumno.service';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.css']
})
export class NuevoAlumnoComponent  implements OnInit {
  
  alumno: AlumnoI = <AlumnoI>{
    id: '',
    nombre: '',
    fechaNacimiento: '',
    
  };
  submitted = false;
  
  constructor(private alumnoService: AlumnoService, private activerouter: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    
  }
  saveAlumno(): void {
	const data = {
		"id": this.alumno.id,
    	"nombre": this.alumno.nombre,
    	"fechaNacimiento": this.alumno.fechaNacimiento,
    
	};	
    this.alumnoService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) =>
        {
        	console.error(e);
		} 
      });
  }

  

  newAlumno(): void {
    this.submitted = false;
    this.alumno = <AlumnoI>{
    	nombre: '',
    	fechaNacimiento: '',
    	
    };
  }

  salir(){
    this.router.navigate(['alumnos']);
  }

}

