
export interface AuthResponse {
    message:string
    accessToken:string
    ok:boolean
    id:number
    user:string    
    role: string[]
    empleado:Empleado
}

export interface Usuario {
    id:number;
    user:string
    role: string[];
    empleado:Empleado
}

interface Empleado {
    id?: number;
    nombre: string;
    apellido:string;
    direccion:string;
    telefono:string;
    estado: boolean;
    createdAt?: Date;
    email:string
}


