import {CursoI} from '../modelos/curso.interface';

export class listaMateriales {
    id?: number;
    titulo?: string;
    costo?: number;
    idCurso: CursoI["id"];
    stock?: number;

}