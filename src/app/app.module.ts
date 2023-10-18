import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';

import {HttpClientModule} from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


import { FormsModule } from '@angular/forms';
import { AlumnosComponent } from './pantallas/alumnos/alumnos.component';
import { TemasComponent } from './pantallas/temas/temas.component';
import { EditarAlumnoComponent } from './pantallas/editar-alumno/editar-alumno.component';
import { NuevoAlumnoComponent } from './pantallas/nuevo-alumno/nuevo-alumno.component';
import { NuevoCursoComponent } from './pantallas/nuevo-curso/nuevo-curso.component';
import { DashboardComponent } from './pantallas/dashboard/dashboard.component';
import { EditarCursoComponent } from './pantallas/editar-curso/editar-curso.component';
import { EditarTemaComponent } from './pantallas/editar-tema/editar-tema.component';
import { NuevoTemaComponent } from './pantallas/nuevo-tema/nuevo-tema.component';
import { MaterialesComponent } from './pantallas/materiales/materiales.component';
import { NuevoMaterialComponent } from './pantallas/nuevo-material/nuevo-material.component';
import { EditarMaterialComponent } from './pantallas/editar-material/editar-material.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents, //para no importar siempre todas las paginas
    AlumnosComponent,
    TemasComponent,
    EditarAlumnoComponent,
    NuevoAlumnoComponent,
    NuevoCursoComponent,
    DashboardComponent,
    EditarCursoComponent,
    EditarTemaComponent,
    NuevoTemaComponent,
    MaterialesComponent,
    NuevoMaterialComponent,
    EditarMaterialComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
