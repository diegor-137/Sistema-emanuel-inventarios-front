import { Sucursal } from "../../sucursales/interfaces/sucursal-interface"



export interface User {
    id?:number
    user:string,
    password:string
    roles:any,
    createdAt?:Date,
    fotoSend:any
    empleado: {
        id?:number
        nombre:string
        apellido:string
        direccion:string
        telefono:string
        email:string
        estado?:boolean
        foto?:{
            id:number,
            url:string,
            key:string
        },
        sucursal: Sucursal
        fotoSend:any
    }
}