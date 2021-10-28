import { Producto } from './producto';
import { Tipo_Precio } from './tipo_precio';
export interface Precio {
    id?:number,
    precio:number,
    estado:boolean,
    tipo_precio:Tipo_Precio
}