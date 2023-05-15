import { Region } from "../../../configuraciones/region/interfaces/region"
import { Tipo_Precio } from "./tipo-precio"

export interface Precio {
    id?:number,
    precio:number,
    estado:boolean,
    tipoPrecio:Tipo_Precio
    region:Region
}