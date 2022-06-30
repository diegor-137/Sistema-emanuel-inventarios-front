export interface Venta {
    cliente: string
    fecha: Date
    id: 19
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
  total:number
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
}

export interface DetalleCobro {
  id?:number
  descripcion:string
  cantidad:number
  tipoCobro: TipoCobro
  icon:string
}

interface TipoCobro {
  
  id:number
  nombre:string

}

export interface Caja {
  id: number;
  lugar: string;
  estado:string;
  empleado: Empleado;
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
}