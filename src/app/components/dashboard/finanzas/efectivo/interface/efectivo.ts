

export interface Efectivo {
    id:number
    fecha?:Date
    empleado?:{
        id:number,
        nombre:string,
        apellido:string
    }
    sucursal?:{
        id:number,
        nombre:string
    }

    detalleEfectivo: DetalleEfectivo[];
    estado?: string
    nombre?:string
}

export interface DetalleEfectivo {
    id?:number
    fecha?:Date
    documento?:string
    descripcion?:string
    monto?:number;
    balance?:number;
    type?: boolean;

}