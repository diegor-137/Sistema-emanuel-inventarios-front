import { Producto } from '../../../almacen/producto/interaces/producto';


export interface Detalle {
    id?:number,
    producto:Producto,
    cantidad:number,
    precio:number
}