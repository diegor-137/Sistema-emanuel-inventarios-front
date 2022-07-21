
import { AbstractControl, AsyncValidatorFn,ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ValidadoresService } from '../services/validadores.service';

/* @Injectable({
    providedIn: 'root'
  }) */

/* export class IventarioValidator{} */
/*     constructor(private service:VentaService){}
     ValidarExistencia(control:AbstractControl) {
         this.service.getInventario(1).subscribe(data=>{
            if (control.value==18) {
                return {Validar:true}
            }
            return null
         })
        
    } */
    export function Inventario(servicio: ValidadoresService):AsyncValidatorFn {
        return (control:AbstractControl):Promise<ValidationErrors | null> | Observable<ValidationErrors | null> =>{
            return servicio.verificarInventario(control.parent?.value.producto).pipe(map(
                (producto:any)=>{
                    //console.log(producto.cantidad,control.parent?.value.cantidad)
                    return (control.value>producto.cantidad)? {"Inventario":true}:null
                }
            ))
            }
        }
        


