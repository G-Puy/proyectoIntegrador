import { DTOStockEnvio } from "./stockEnvioDTO.interface";
export interface DTOProductoEnvio {
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
    stock: DTOStockEnvio;
}
