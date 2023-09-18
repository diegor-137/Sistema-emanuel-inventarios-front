


export interface CuentaBancaria {
    id?:number,
    numero?:string,
    nombre?:string,
    banco?:Banco
    detalleCuentaBancaria?:DetalleCuentaBancaria[]

}

export interface DetalleCuentaBancaria{
    id?:number
    fecha?:Date
    documento?:string
    descripcion?:string
    monto? :number
    balance?:number
    type?:boolean
    empleado?:{
        id:number,
        nombre:string,
        apellido:string
    }
}

export interface Banco {
    id?:number,
    nombre?:string
}