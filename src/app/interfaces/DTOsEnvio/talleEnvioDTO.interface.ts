import { DTOColorEnvio } from "./colorEnvioDTO.interface";

export interface DTOTalleEnvio {
    id: number;
    idProducto: number;
    cantidad: number;
    colores: DTOColorEnvio[],
    nombreTalle: string

}
