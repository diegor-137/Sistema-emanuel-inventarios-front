import { CuentaBancaria } from "../../../finanzas/fondos/interfaces/cuenta-bancaria"


export interface CuentaPorCobrar {
    ventaid?: number,
    id?: number,
    fechainicio?:Date,
    fechafinal?: Date,
    estado?: boolean,
    cliente?: string,
    total?: number,
    pagos?: number,
    saldo?: number    
}

export interface CuentaPorCobrarDetalle {
    id?: number
    fecha?: Date
    /*  */
    descripcion: string
    monto: number
    balance?: number
    cuentaPorCobrar?:number
    tipoTransaccion:TipoTransaccion
    /* Only for interface */ 
    documento?:string
    cuentaBancaria?:CuentaBancaria
    /*  */   
}

export interface TipoTransaccion {
    id:number
    nombre:string
}

export interface form {
    id:number,
    detalleCuentaPorCobrar:CuentaPorCobrarDetalle[]
}