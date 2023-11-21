export interface DTOTalle {
    Id: number;
    Nombre: string;
    BajaLogica: boolean;
}

export interface DTOStock {
    Id: number;
    IdProducto: number;
    IdColor: number;
    IdTalle: number;
    Cantidad: number;
}
