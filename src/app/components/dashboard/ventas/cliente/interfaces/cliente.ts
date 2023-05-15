
export interface Cliente {
    id?: number;
    nombre: string;
    direccion:string;
    telefono:string;
    nit:string;
    estado: boolean;
    createdAt?: Date;
    credito: Credito[]
}

export interface Credito {
        limite:number,
        diasCredito:number,
        estado:true,
        id:number,
}