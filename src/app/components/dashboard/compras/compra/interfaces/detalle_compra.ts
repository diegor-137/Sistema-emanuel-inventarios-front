import { Producto } from '../../../almacen/producto/interaces/producto';


export interface Detalle_Compra {
    id?:number,
    producto:Producto,
    cantidad:number,
    precio:number
}