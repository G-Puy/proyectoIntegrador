import { DTOImagen } from "../DTOImagen.interface";
import { DTOStockEnvio } from "../DTOsEnvio/stockEnvioDTO.interface";
export interface recibirProductoDTOBack {
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
    imagenes: DTOImagen[];
    tipoProductoNombre: string;


}
