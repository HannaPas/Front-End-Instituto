import { Component, OnInit } from '@angular/core';
import { Tema} from 'src/app/modelos/tema.model'
import { TemaService } from 'src/app/servicios/api/tema.service'; 
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nuevo-tema',
  templateUrl: './nuevo-tema.component.html',
  styleUrls: ['./nuevo-tema.component.css']
})
export class NuevoTemaComponent implements OnInit {

  tema: Tema = <Tema>{
    id: 0,
    nombre: '',
    duracion: 0,
    
  };
  submitted = false;
  
  constructor(private alumnoService: TemaService, private activerouter: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    
  }
  saveTema(): void {
	const data = {
		"id": this.tema.id,
    	"nombre": this.tema.nombre,
    	"duracion": this.tema.duracion,
    
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

  

  newTema(): void {
    this.submitted = false;
    this.tema = <Tema>{
    	nombre: '',
    	fechaNacimiento: '',
    	
    };
  }

  salir(){
    this.router.navigate(['temas']);
  }


}
