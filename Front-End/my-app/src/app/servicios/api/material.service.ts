import { Injectable } from '@angular/core';
import { listaMateriales } from 'src/app/modelos/listamateriales.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from 'src/app/modelos/material.interfase';

@Injectable({
  providedIn: 'root'
})
export class MaterialService{

  url: string = 'http://localhost:8080/materiales';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {


   }

     ///////////////////////MATERIALES///////////////////////


     getAllMateriales(): Observable<listaMateriales[]> {
      let direccion = this.url
      return this.http.get<listaMateriales[]>(direccion);
    }
  
    getSingleMaterial(id: any): Observable<Material> {
      let direccion = this.url + "/" + id;
      return this.http.get<Material>(direccion)
    }
  
    putMaterial(id: any, data: Material): Observable<any> {
  
      const bodyData = {
        "id": id,
        "titulo": data.titulo,
        "costo": data.costo,
        "idCurso": data.idCurso,
        "stock": data.stock,
  
      };

      let direccion = this.url
      return this.http.put(`${direccion}`, bodyData, { responseType: 'text' });
    }
  
  
    deleteMaterial(id: any): Observable<any> {
      return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
    }
  
  
    actualizarMaterial(id: any, data: Material): Observable<any> {
      //Conversione a form data
      const bodyData = {
        "id": id,
        "titulo": data.titulo,
        "costo": data.costo,
        "idCurso": data.idCurso,
        "stock": data.stock,
  
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


    getMaterialesPorNombre(nombre: string): Observable<listaMateriales[]> {
      const url = `${this.url}/titulo/${nombre}`;
      return this.http.get<listaMateriales[]>(url);
    }

    getMaterialesPorCursoId(id: string): Observable<listaMateriales[]> {
      const url = `${this.url}/curso/${id}`;
      return this.http.get<listaMateriales[]>(url);
    }
}
