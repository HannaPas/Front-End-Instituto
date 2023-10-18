import { Component, OnInit} from '@angular/core';
import {AlumnoService} from '../../servicios/api/alumno.service';
import {Router} from '@angular/router';
import {listaAlumnos} from '../../modelos/listaalumnos.interface';


@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit{

  alumnos?: listaAlumnos[];

   constructor(private api:AlumnoService, private router:Router) {}

  ngOnInit(): void{

    this.api.getAllAlumnos().subscribe(data =>{
      this.alumnos = data;
      console.log(data);
    })
  }

  editarAlumno(id: any){
    this.router.navigate(['editarAlumno',id]);
  }

  nuevoAlumno(){
    this.router.navigate(['nuevoAlumno']);
  }

}
