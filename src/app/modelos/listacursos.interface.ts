import { Tema } from '../modelos/tema.model';

export interface listaCursos{
    id?: number;
	nombre?: string;	
	tema?: Tema;
	fechaInicio?: Date;
	idDocente?: number;
}