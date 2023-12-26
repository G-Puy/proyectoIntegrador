import { DTOImagen } from "../DTOImagen.interface";
import { DTOColorEnvio } from "../DTOsEnvio/colorEnvioDTO.interface";
import { DTOTalleEnvio } from "../DTOsEnvio/talleEnvioDTO.interface";
import { DTOGenAbms } from "../objGenericoParaABMS.interface";
export interface objCarritoYProcesoDeCompra {
    idProducto: number;
    nombreProducto: string;
    precio: number;
    oferta: boolean;
    imagen: DTOImagen;
    idStock: number;
    talle: DTOGenAbms;
    color: DTOGenAbms;
    cantidad: number;
}

