import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {listaCursos} from '../../modelos/listacursos.interface'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {CursoI} from '../../modelos/curso.interface';
import {Tema} from '../../modelos/tema.model';
import { ResponseI } from "src/app/modelos/response.interface";

@Injectable({
    providedIn:'root'

})

export class ApiService{
  
    url:string = "http://localhost:8080/cursos";

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    
    constructor(private http:HttpClient) {}


   

    /////////////////////////////////////////////////////////////////////////
    getAll(): Observable<CursoI[]> {
      return this.http.get<CursoI[]>(this.url);
    }
    get(id: any): Observable<CursoI> {
      return this.http.get<CursoI>(`${this.url}/${id}`);
    }
    create(data: any): Observable<any> {
    console.log(data);
    //Conversione a form data
    //const formData = new FormData();
    //formData.append('title', <string>data.title);
      //formData.append('status', <string>data.status);
    //formData.append('content', <string>data.content);
      return this.http.post(`${this.url}`, data, {responseType: 'text'});
    }
    update(id: any, data: CursoI): Observable<any> {
    //Conversione a form data
    const bodyData = {
      "id": id,
        "nombre": data.nombre,
        "fechaInicio": data.fechaInicio,
        "idDocente": data.idDocente ,
        "tema": data.tema
    };
      return this.http.put(`${this.url}`, bodyData, {responseType: 'text'});
    }
    delete(id: any): Observable<any> {
      return this.http.delete(`${this.url}/delete/${id}`, {responseType: 'text'});
    }
    deleteAll(): Observable<any> {
      return this.http.delete(this.url);
    }
    findByTitle(nombre: any): Observable<CursoI> {
      return this.http.get<CursoI>(`${this.url}?nombre=${nombre}`);
    }
  

    ////////////////////////////CURSOS//////////////////////////////////////

    getAllCursos():Observable<listaCursos[]>{
      let direccion = this.url 
      return this.http.get<listaCursos[]>(direccion);
    }
     getSingleCurso(id: any):Observable<CursoI>{
        let direccion = this.url + "/" + id;
        return this.http.get<CursoI>(direccion)
      }

      saveTema(tema: Tema): Observable<Tema> {
        let direccion = "http://localhost:8080/temas"
        return this.http.post<Tema>(direccion, tema, this.httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
    
      
        
     
    private handleError(error: any) {
        console.error('Algo salió mal:', error);
        return throwError(error);
      }
    
      
        
      putCurso(id: any, data: CursoI): Observable<any> {
        
        const bodyData = {
          "id": id,
            "nombre": data.nombre,
            "fechaInicio": data.fechaInicio,
            "idDocente": data.idDocente ,
            "tema": data.tema
        };
        let direccion = this.url
        return this.http.put(`${direccion}`, bodyData, {responseType: 'text'});
        }

        getTemas(): Observable<Tema[]> {
          let direccion = "http://localhost:8080/temas"
          return this.http.get<Tema[]>(direccion);
        }

       
}      







