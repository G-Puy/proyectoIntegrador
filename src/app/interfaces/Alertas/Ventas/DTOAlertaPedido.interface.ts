export interface DTOAlertaPedido {
    id: number;
    idVenta: number;
    montoTotal: number;
    envio: boolean;
    nombre: string;
    apellido: string;
    telefono: string;
    direccion: string;
    realizado: boolean;
}