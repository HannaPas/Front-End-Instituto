import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from './pantallas/dashboard/dashboard.component';
import {EditarCursoComponent} from "./pantallas/editar-curso/editar-curso.component";
import { NuevoCursoComponent } from './pantallas/nuevo-curso/nuevo-curso.component';

import {AlumnosComponent} from './pantallas/alumnos/alumnos.component';
import {EditarAlumnoComponent}from './pantallas/editar-alumno/editar-alumno.component';
import {NuevoAlumnoComponent} from './pantallas/nuevo-alumno/nuevo-alumno.component';

import {TemasComponent} from './pantallas/temas/temas.component';
import {EditarTemaComponent} from './pantallas/editar-tema/editar-tema.component';
import {NuevoTemaComponent} from './pantallas/nuevo-tema/nuevo-tema.component';

import { MaterialesComponent } from './pantallas/materiales/materiales.component';
import { EditarMaterialComponent } from './pantallas/editar-material/editar-material.component';
import { NuevoMaterialComponent } from './pantallas/nuevo-material/nuevo-material.component';

const routes: Routes = [
  {path: 'dashboard', component:DashboardComponent},
  {path: 'nuevo', component:NuevoCursoComponent},
  {path: 'editar/:id', component:EditarCursoComponent},

  {path: 'alumnos', component:AlumnosComponent},
  {path: 'editarAlumno/:id', component:EditarAlumnoComponent},
  {path: 'nuevoAlumno', component:NuevoAlumnoComponent},

  {path: 'temas', component:TemasComponent,},
  {path: 'editarTema/:id', component:EditarTemaComponent},
  {path: 'nuevoTema', component: NuevoTemaComponent},

  {path: 'materiales', component:MaterialesComponent},
  {path: 'editarMaterial/:id', component:EditarMaterialComponent},
  {path: 'nuevoMaterial', component:NuevoMaterialComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent,NuevoCursoComponent,EditarCursoComponent,AlumnosComponent,EditarAlumnoComponent,NuevoAlumnoComponent,TemasComponent,NuevoTemaComponent,EditarTemaComponent]