import { CuentaBancaria } from "../../../finanzas/fondos/interfaces/cuenta-bancaria"


export interface ConfiguracionGlobal {
    id:number
    efectivo:Atributos
    cuentaBancaria:CuentaBancaria,
    ventaCobro:boolean
}


interface Atributos {
    id:number,
    nombre:string
}