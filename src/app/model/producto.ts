export class Producto {
    id: number ;
    nombre: string ;
    cantidad: string ;
    constructor(
        id: number =0, 
        nombre: string='', 
        cantidad: string=''
    ) {
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}
