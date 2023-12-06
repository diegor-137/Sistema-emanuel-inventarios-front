import { Efectivo } from "../../efectivo/interface/efectivo"
import { Banco, CuentaBancaria } from "../../fondos/interfaces/cuenta-bancaria"
import { TipoGasto } from "../tipo-gasto/interface/tipo-gasto"

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
  /* RAW  CONSULT*/
  venta_id?:number
  monto?:number
  cliente?:string
  /* RAW */
  caja:Caja
  detalleCobro:DetalleCobro[]
  deletedAt?:Date
}

export interface DetalleCobro {
  id?:number
  descripcion:string
  monto:number
  tipoTransaccion: TipoTransaccion
  icon:string
  estado: boolean
  documento?:string
  cuentaBancaria?:CuentaBancaria
}

export interface Form {
  id:number,
  detalleCobro:DetalleCobro[]
}

interface TipoTransaccion {
  
  id:number
  nombre:string

}

export interface Caja {
  id: number;
  nombre: string;
  estado:string;
  empleado: Empleado;
  status:boolean
  efectivo:Efectivo
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
  solicitante:string
  monto:number
  documento:string
  empleado:Empleado
  deletedAt?:Date
  efectivo:Efectivo
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
  },
  tipoGasto:TipoGasto;
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

