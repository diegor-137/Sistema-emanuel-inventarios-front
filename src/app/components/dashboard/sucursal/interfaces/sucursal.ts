import { Region } from "../../configuraciones/region/interfaces/region";

export interface Sucursal {
    id?:number;
    nombre:string;
    estado:boolean
    region:Region
}