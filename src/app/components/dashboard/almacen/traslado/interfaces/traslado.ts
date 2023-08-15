


export interface Traslado {
    id:number,
    observacion?:string
    createdAt:Date
    autorizarDate:Date
    status:string
    solicitador:Usuario,
    responsable:Usuario,
    sucursalSol:{
        id:number
        nombre:string
    },
    sucursalResp:{
        id:number
        nombre:string
    },
    detalle: DetalleTraslado[]
}

export interface DetalleTraslado {
    cantidad:number,
    producto: Producto
}

export interface Sucursal {
    id:number,
    nombre:string
}

export interface Producto { 
    id:number,
    nombre:string
}

export interface Envio {
    id:number
    observacionEnvio: string
    observacionRecepcion: string
    fechaInicio: Date
    fechaFin: Date
    traslado: Traslado
    despachador:Usuario,
    recepcionador:Usuario,
    sucursalDespachador:{
        nombre:string
    },
    sucursalRecepcionador:{
        nombre?:string
    },
    status: string
}

interface Usuario {
    nombre:string,
    apellido:string
}