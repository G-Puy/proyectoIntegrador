import { DTOTalleEnvio } from "./talleEnvio.interface";

export interface DTOStock {
    id: number;
    idProducto: number;
    talles: DTOTalleEnvio[];
    cantidadTotal: number;
    cargado: boolean;
}
