


export interface User {
    id:number
    user:string,
    roles:string[],
    createdAt:Date,
    empleado: {
        id:number
        nombre:string
        apellido:string
        direccion:string
        telefono:string
        email:string
        estado:boolean
        foto:{
            id:number,
            url:string,
            key:string
        }
    }
}