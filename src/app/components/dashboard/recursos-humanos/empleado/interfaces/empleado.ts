
import { Puesto } from '../../puesto/interfaces/puesto';
import { Sucursal } from '../../../sucursal/interfaces/sucursal';
export interface Empleado {
    id?: number;
    nombre: string;
    apellido:string;
    direccion:string;
    telefono:string;
    estado: boolean;
    createdAt?: Date;
    puesto:Puesto
    sucursal:Sucursal

}