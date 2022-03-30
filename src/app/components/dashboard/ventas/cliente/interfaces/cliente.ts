
export interface Cliente {
    id?: number;
    nombre: string;
    direccion:string;
    telefono:string;
    nit:string;
    estado: boolean;
    createdAt?: Date;
}