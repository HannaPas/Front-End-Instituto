import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import {Router} from '@angular/router';


import {listaCursos} from '../../modelos/listacursos.interface';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cursos?: listaCursos[];
  

  constructor(private cursoService: ApiService, private router:Router) { }
  ngOnInit(): void {
    this.retrieveCursos();
  }
  
  

  retrieveCursos(): void {
    this.cursoService.getAllCursos()
      .subscribe({
        next: (data) => {
          this.cursos = data;
          console.log(this.cursos);
        },
        error: (e) => console.error(e)
      });
  }
  
  AgregarCurso(){
    this.router.navigate(['nuevo']);
  }

  EditarCurso(id:any){
    this.router.navigate(['editar',id]);
  }

}


