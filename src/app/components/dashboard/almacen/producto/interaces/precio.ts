import { Producto } from './producto';
import { Tipo_Precio } from './tipo_precio';
export interface Precio {
    id?:number,
    precio:number,
    estado:boolean,
    tipoPrecio:Tipo_Precio
}