import { CuentaBancaria } from "../../../finanzas/fondos/interfaces/cuenta-bancaria"


export interface CuentaPorPagar {
    id?:number,
    fechainicio?:Date
    fechafinal?:Date
    estado?:boolean
    pagos?:number
    documento?:string
    total?:number
    proveedor?:string
    saldo?:number
}

export interface CuentaPorPagarDetalle {
    id: number
    fecha: Date
    /*  */
    descripcion: string
    monto: number
    balance: number
    tipoTransaccion:TipoTransaccion
    /* Only for interface */
    documento?:string
    cuentaBancaria?:CuentaBancaria
}

export interface TipoTransaccion {
    id:number
    nombre:string
}

export interface Form {
    id:number,
    detalleCuentaPorPagar:CuentaPorPagarDetalle[]
}