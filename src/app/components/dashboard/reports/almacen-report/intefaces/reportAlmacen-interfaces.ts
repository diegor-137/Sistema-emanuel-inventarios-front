
export interface ListGeneralProd {
    header:Header
    resultado:any[]
}

export interface Header {
    documento:string
        sucursal:{
        nombre:string,
        direccion:string
    }
    empleado:{
        nombre:string
        apellido:string
    }
}

