import {listaAlumnos} from '../../modelos/listaalumnos.interface';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AlumnoI} from '../../modelos/alumno.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'

})

export class AlumnoService{
  
    url:string = "http://localhost:8080/alumnos";

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      constructor(private http:HttpClient) {}


       ///////////////////////ALUMNOS///////////////////////
      
       getAllAlumnos():Observable<listaAlumnos[]>{
        let direccion = this.url
        return this.http.get<listaAlumnos[]>(direccion);
      }

      getSingleAlumno(id:any):Observable<AlumnoI>{
        let direccion = this.url + "/" + id;
        return this.http.get<AlumnoI>(direccion)
      }

      putAlumno(id: any, data: AlumnoI): Observable<any> {
        
        const bodyData = {
          "id": id,
            "nombre": data.nombre,
            "fechaNacimiento": data.fechaNacimiento,
            
        };
        let direccion = this.url
        return this.http.put(`${direccion}`, bodyData, {responseType: 'text'});
        }
    
       actualizarAlumno(id: any, data: AlumnoI): Observable<any> {
            //Conversione a form data
            const bodyData = {
              "id": id,
                "nombre": data.nombre,
                "fechaInicio": data.fechaNacimiento,
                
            };
              return this.http.put(`${this.url}`, bodyData, {responseType: 'text'});
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
}

