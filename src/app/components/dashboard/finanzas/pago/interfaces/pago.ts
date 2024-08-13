import { Compra } from "../../../compras/compra/interfaces/compra";
import { TipoTransaccion } from "../../../compras/creditos/interfaces/cuenta-por-pagar";
import { Empleado } from "../../../recursos-humanos/empleado/interfaces/empleado";




export interface Pago {

    id:number
    fecha:Date
    deletedAt: Date;
    nombre:any
    apellido:any
    documento:string
    compra:any
    total:number
    detallePago:DetallePago

}

export interface DetallePago {
    id:number
    descripcion:string
    monto:number
    tipoTransaccion:TipoTransaccion
}