import { Empleado } from '../../../recursos-humanos/empleado/interfaces/empleado';
import { Sucursal } from '../../../sucursal/interfaces/sucursal';
import { Detalle } from './detalle_compra';
import { Proveedor } from '../../proveedor/interfaces/proveedor';

export interface Compra {
    id?: number;
    documento: string;
    observacion:string;
    estado: boolean;
    createdAt?: Date;
    empleado:Empleado;
    proveedor:Proveedor;
    detalle:Detalle[]
    sucursal:Sucursal;
}