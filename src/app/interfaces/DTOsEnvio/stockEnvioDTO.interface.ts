import { DTOTalleEnvio } from "./talleEnvioDTO.interface";

export interface DTOStockEnvio {
    id: number;
    idProducto: number;
    talles: DTOTalleEnvio[];
    cantidadTotal: number;
    cargado: boolean;
}
