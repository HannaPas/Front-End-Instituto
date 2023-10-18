import { Component, OnInit } from '@angular/core';
import { CursoI } from 'src/app/modelos/curso.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from 'src/app/modelos/tema.model';


@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css']
})
export class NuevoCursoComponent  implements OnInit {
  temas: Tema[] = []; // para almacenar los temas
  curso: CursoI = <CursoI>{
    nombre: '',
    fechaInicio: new Date(),
    idDocente: 1, //campo obligatorio
    tema: {
            id: 2 //campo obligatorio
        }
  };
  submitted = false;
  
  constructor(private cursoService: ApiService, private activerouter: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.cursoService.getTemas()
    .subscribe({
      next: (temas) => {
        this.temas = temas;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
  saveCurso(): void {
    const data = {
    	"id": this.curso.id,
    	"nombre": this.curso.nombre,
    	"fechaInicio": this.curso.fechaInicio,
    	"idDocente": this.curso.idDocente ,
    	"tema": this.curso.tema
  };
    this.cursoService.create(data)
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


  formatDate(inputDate: Date): Date {
    const pad = (num: number): string => num < 10 ? `0${num}` : num.toString();
    
    const YYYY = inputDate.getUTCFullYear();
    const MM = pad(inputDate.getUTCMonth() + 1); // Los meses van de 0 a 11, así que añadimos 1
    const DD = pad(inputDate.getUTCDate());
    const hh = pad(inputDate.getUTCHours());
    const mm = pad(inputDate.getUTCMinutes());
    const ss = pad(inputDate.getUTCSeconds());

    const formattedDate = `${YYYY}-${MM}-${DD}T${hh}:${mm}:${ss}.000+00:00`;
    return new Date(formattedDate);
  }

  newCurso(): void {
    this.submitted = false;
    this.curso = <CursoI>{
    	nombre: '',
    	fechaInicio: new Date(),
    	idDocente: 1, //campo obligatorio
    	tema: {
            id: 2 //campo obligatorio
        }
    };
  }

  salir(){
    this.router.navigate(['dashboard']);
  }

}

