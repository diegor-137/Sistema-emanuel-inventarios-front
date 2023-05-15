

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
    descripcion: string
    monto: number
    balance: number
}