import { CuentaBancaria } from "../../../finanzas/fondos/interfaces/cuenta-bancaria"


export interface ConfiguracionGlobal {
    id:number
    efectivo:Atributos
    cuentaBancaria:CuentaBancaria
}


interface Atributos {
    id:number,
    nombre:string
}