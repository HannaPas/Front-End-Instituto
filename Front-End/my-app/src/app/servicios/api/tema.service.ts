import { Injectable } from '@angular/core';
import { listaTemas } from '../../modelos/listatemas.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tema } from 'src/app/modelos/tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  url: string = "http://localhost:8080/temas";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  ///////////////////////TEMAS///////////////////////


  getAllTemas(): Observable<listaTemas[]> {
    let direccion = this.url
    return this.http.get<listaTemas[]>(direccion);
  }

  getSingleTema(id: any): Observable<Tema> {
    let direccion = this.url + "/" + id;
    return this.http.get<Tema>(direccion)
  }

  putTema(id: any, data: Tema): Observable<any> {

    const bodyData = {
      "id": id,
      "nombre": data.nombre,
      "duracion": data.duracion,

    };
    let direccion = this.url
    return this.http.put(`${direccion}`, bodyData, { responseType: 'text' });
  }


  deleteTema(id: any): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }


  actualizarTema(id: any, data: Tema): Observable<any> {
    //Conversione a form data
    const bodyData = {
      "id": id,
      "nombre": data.nombre,
      "duracion": data.duracion,

    };
    return this.http.put(`${this.url}`, bodyData, { responseType: 'text' });
  }

  create(data: any): Observable<any> {
    console.log(data);
    //Conversione a form data
    //const formData = new FormData();
    //formData.append('title', <string>data.title);
    //formData.append('status', <string>data.status);
    //formData.append('content', <string>data.content);
    return this.http.post(`${this.url}`, data, { responseType: 'text' });
  }
}



