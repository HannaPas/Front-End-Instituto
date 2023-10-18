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
  terminoBusqueda: string = '';
  tipoBusqueda: string = 'nombre';

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


  buscarMaterial(): void {
    if (this.terminoBusqueda.trim() === '') {
      // Obtener todos los materiales si el término de búsqueda está vacío
      this.api.getAllMateriales().subscribe(data => {
        this.materiales = data;
      });
    } else if (this.tipoBusqueda === 'nombre') {
      // Buscar materiales por nombre
      this.api.getMaterialesPorNombre(this.terminoBusqueda).subscribe(data => {
        this.materiales = data;
      });
    } else if (this.tipoBusqueda === 'curso') {
      // Buscar materiales por ID de curso
      this.api.getMaterialesPorCursoId(this.terminoBusqueda).subscribe(data => {
        this.materiales = data;
      });
    }
  }
}
