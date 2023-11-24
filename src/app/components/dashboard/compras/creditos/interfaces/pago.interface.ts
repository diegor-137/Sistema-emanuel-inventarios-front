import { CuentaBancaria } from "../../../finanzas/fondos/interfaces/cuenta-bancaria"
import { TipoTransaccion } from "./cuenta-por-pagar"


export interface Pago{
    comentario:string,
    efectivo:number,
    detallePago: DetallePago[]
}

export interface DetallePago{
    descripcion: string
    monto: number
    tipoTransaccion:TipoTransaccion
    documento?:string
    cuentaBancaria?:CuentaBancaria
}