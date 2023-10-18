import{Tema} from './tema.model'

export class listaTemas {
    id?: number;
    nombre?: string;
    duracion?: number;

    constructor(tema: Partial<Tema> = {}) {
        this.id = tema.id;
        this.nombre = tema.nombre;
        this.duracion = tema.duracion;
    }
}
