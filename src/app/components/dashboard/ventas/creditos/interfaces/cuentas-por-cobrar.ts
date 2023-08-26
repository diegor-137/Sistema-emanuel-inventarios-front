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
    tipoCobro:TipoCobro 
    documento?:string
    cuentaBancaria?:CuentaBancaria
    /*  */   
    icon?:string

}

export interface TipoCobro {
    id:number
    nombre:string
}