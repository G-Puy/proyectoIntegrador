import { DTOColorEnvio } from "./colorEnvio.interface";

export interface DTOTalleEnvio {
    id: number;
    idProducto: number;
    cantidad: number;
    colores: DTOColorEnvio[],
    nombreTalle: string

}
