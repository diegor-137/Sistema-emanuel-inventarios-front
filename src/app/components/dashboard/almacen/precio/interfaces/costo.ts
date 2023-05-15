import { Region } from "../../../configuraciones/region/interfaces/region"

export interface Costo{
    id?:number
    costo_prom: number,
    costo_prom_old:number,
    ultimo_precio:number,
    region:Region
}