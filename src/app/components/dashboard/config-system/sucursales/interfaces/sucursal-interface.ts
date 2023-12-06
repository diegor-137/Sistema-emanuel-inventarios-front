import { Region } from "../../../configuraciones/region/interfaces/region";



export interface Sucursal {
    id:number;
    nombre:string;
    estado:boolean;
    direccion:string
    region:Region
    createdAt:Date;
    foto:{
        id:number,
        url:string,
        key:string
    }
    fotoSend?:any
}