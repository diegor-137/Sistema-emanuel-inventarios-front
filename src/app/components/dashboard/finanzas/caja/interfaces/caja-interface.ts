import { Banco, CuentaBancaria } from "../../fondos/interfaces/cuenta-bancaria"

export interface Venta {
    id: number
    cliente: string
    fecha: Date
    status: string
    total: number
    idcobro?: number
  }

export interface Cobro {
  id:number;
  fecha: Date
  detalleCobro: DetalleCobro[]
}  

export interface Cobros{
  id:number;
  fecha:Date
  nombre:string;
  apellido:string
  venta:number
  cliente:string
  total:number,
  deletedat:Date
  nombreresp?:string
  apellidoresp?:string
}

export interface CobroDetallado {
  id:number;
  fecha:Date
  empleado: Empleado
  venta:{
    id:number;
    createdAt:Date
    cliente:{
      id:number
      nombre:string
      direccion:string
    }    
  }
  caja:Caja
  detalleCobro:DetalleCobro[]
  deletedAt?:Date
}

export interface DetalleCobro {
  id?:number
  descripcion:string
  cantidad:number
  tipoTransaccion: TipoTransaccion
  icon:string
  estado: boolean
  documento?:string
  cuentaBancaria?:CuentaBancaria
}

interface TipoTransaccion {
  
  id:number
  nombre:string

}

export interface Caja {
  id: number;
  lugar: string;
  estado:string;
  empleado: Empleado;
  status:boolean
}

export interface Empleado {
  id:number
  nombre:string
  apellido:string
  user:User
}

interface User {
  roles:string[]
}


export interface Corte {
  id:number
  fechas: Date
  observacion?:string
  monto?:number
  balance?:number
  empleado: {
    nombre:string
    apellido:string
  }
  corteCajaDetalle: CorteCajaDetalle []
  caja?:Caja
}

interface CorteCajaDetalle {
  id:number,
  monto:number,
  concepto: string,
  type:boolean
}

export interface Movimiento {
  id:number,
  fecha:Date,
  descripcion:string
  monto:number
  balance:number
  type:boolean
}

export interface Gasto {
  id:number
  fecha:Date
  descripcion:string
  monto:number
  documento:string
  empleado:Empleado
  caja:Caja
  deletedAt?:Date
  deleteResponsible?: {
    nombre:string
    apellido:string
  }
  fotoSend?:any
  token?:string
  foto:{
    id:number,
    url:string,
    key:string
  }
}


export interface Ingreso{
  id: number
  fecha: Date
  descripcion: string
  monto:number
}

export interface Egreso{
  id: number
  fecha: Date
  descripcion: string
  monto:number
}

