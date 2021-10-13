import { Departamento } from "../../departamento/interfaces/departamento";

export interface Puesto {
    id?: number;
    nombre: string;
    estado: boolean;
    createdAt?: Date;
    departamento:Departamento
}