import { Tema } from '../modelos/tema.model';

export class CursoI{
    id?: number;
	nombre?: string;	
	tema?: Tema;
	fechaInicio?: Date;
	idDocente?: number;
}