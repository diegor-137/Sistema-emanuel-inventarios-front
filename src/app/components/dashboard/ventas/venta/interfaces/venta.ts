import { Empleado } from "../../../recursos-humanos/empleado/interfaces/empleado";
import { Sucursal } from "../../../sucursal/interfaces/sucursal";
import { Cliente } from "../../cliente/interfaces/cliente";
import { Detalle } from "./detalle_venta";

export interface Venta {
    id?: number;
    observacion:string;
    estado: boolean;
    createdAt?: Date;
    empleado:Empleado;
    cliente:Cliente;
    detalle:Detalle[]
    sucursal:Sucursal;
}