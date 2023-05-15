

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
    id: number
    fecha: Date
    descripcion: string
    monto: number
    balance: number
    cuentaPorCobrar?:number
}