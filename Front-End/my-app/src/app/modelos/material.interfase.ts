import {CursoI} from '../modelos/curso.interface';

export class Material {
    id?: number;
    titulo?: string;
    costo?: number;
    idCurso?: CursoI["id"];
    stock?: number;

}