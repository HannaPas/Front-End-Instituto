export class Tema {
    id?: number;
    nombre?: string;
    duracion?: number;

    constructor(tema: Partial<Tema> = {}) {
        this.id = tema.id;
        this.nombre = tema.nombre;
        this.duracion = tema.duracion;
    }
}
