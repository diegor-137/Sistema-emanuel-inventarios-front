


export interface Sucursal {
    id:number;
    nombre:string;
    estado:boolean;
    direccion:string
    createdAt:Date;
    foto:{
        id:number,
        url:string,
        key:string
    }
    fotoSend?:any
}