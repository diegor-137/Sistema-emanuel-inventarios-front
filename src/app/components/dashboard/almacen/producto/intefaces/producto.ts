import { Categoria } from '../../categoria/interfaces/categoria';
import { Marca } from '../../marca/interfaces/marca';
import { Costo } from '../../precio/interfaces/costo';
import { Precio } from '../../precio/interfaces/precio';
import { Inventario } from './inventario';
export interface Producto {
    id?: number;
    nombre:string,
    descripcion: string;
    codigoBarras?: Date;
    estado: boolean;
    costo_prom: number,
    costo_prom_old:number,
    ultimo_precio:number,
    categoria:Categoria,
    marca:Marca,
    precio:Precio[],
    inventario:Inventario[]
    costo:Costo[]
}