import { Component, OnInit } from '@angular/core';
import {TemaService} from '../../servicios/api/tema.service';
import {Router} from '@angular/router';
import {listaTemas} from '../../modelos/listatemas.interface';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  temas?: listaTemas[];

   constructor(private api:TemaService, private router:Router) {}

  ngOnInit(): void{

    this.api.getAllTemas().subscribe(data =>{
      this.temas = data;
      console.log(data);
    })
  }

  editarTema(id: any){
    this.router.navigate(['editarTema',id]);
  }

  nuevoTema(){
    this.router.navigate(['nuevoTema']);
  }

}



