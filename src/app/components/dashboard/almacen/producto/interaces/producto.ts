import { Categoria } from '../../categoria/interfaces/categoria';
import { Marca } from '../../marca/interfaces/marca';
import { Inventario } from './inventario';
import { Precio } from './precio';
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
    precio:Precio[]
    inventario:Inventario[]
}