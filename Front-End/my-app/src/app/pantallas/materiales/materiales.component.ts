import { Component, OnInit } from '@angular/core';
import { MaterialService} from 'src/app/servicios/api/material.service'; 
import {Router} from '@angular/router';
import { listaMateriales } from 'src/app/modelos/listamateriales.interface';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {


  
  materiales?: listaMateriales[];

   constructor(private api:MaterialService, private router:Router) {}

  ngOnInit(): void{

    this.api.getAllMateriales().subscribe(data =>{
      this.materiales = data;
      console.log(data);
    })
  }

  editarMaterial(id: any){
    this.router.navigate(['editarMaterial',id]);
  }

  nuevoMaterial(){
    this.router.navigate(['nuevoMaterial']);
  }

  
}
