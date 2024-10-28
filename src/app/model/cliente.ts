export class Cliente {
    id: number ;
    nombre: string ;
    apellido: string ;
    constructor(id: number=0, nombre: string='', apellido: string='') {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

