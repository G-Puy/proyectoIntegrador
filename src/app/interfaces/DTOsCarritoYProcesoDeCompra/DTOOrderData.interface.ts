export interface objOrderData {
    datosPersona: objOrderDataPersona
    datosProductos: objOrderDataProducto[]
}
export interface objOrderDataPersona {
    nombre: string,
    apellido: string,
    departamento: string,
    ciudad: string,
    barrio: string,
    direccion: string,
    mail: string,
    telefono: string,
    enviar: boolean
}
export interface objOrderDataProducto {
    id: number,
    idColor: number,
    idTalle: number,
    cantidad: number,
}



