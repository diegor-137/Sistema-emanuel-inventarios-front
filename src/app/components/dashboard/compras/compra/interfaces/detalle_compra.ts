import { Producto } from '../../../almacen/producto/intefaces/producto';


export interface Detalle {
    id?:number,
    producto:Producto,
    cantidad:number,
    precio:number
}