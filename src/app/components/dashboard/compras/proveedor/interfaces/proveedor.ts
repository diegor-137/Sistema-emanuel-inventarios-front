
export interface Proveedor {
    id?: number;
    nombre: string;
    direccion:string;
    telefono:string;
    nit:string;
    correo:string;
    estado: boolean;
    createdAt?: Date;
}