import { Sucursal } from "../../../sucursal/interfaces/sucursal";

export interface Inventario {
    id?:number,
    cantidad:number,
    sucursal:Sucursal
}