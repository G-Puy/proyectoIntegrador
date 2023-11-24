import { DTOStock } from "./stockDTO.interface";
export interface DTOProducto {
    id: number;
    nombre: string;
    descripcion: string;
    precioActual: number;
    precioAnterior: number;
    idTipoProducto: number;
    visibleEnWeb: boolean;
    nuevo: boolean;
    bajaLogica: boolean;
    guiaTalles: string;
    stocks: DTOStock[];
    imagenes: File[];
}
