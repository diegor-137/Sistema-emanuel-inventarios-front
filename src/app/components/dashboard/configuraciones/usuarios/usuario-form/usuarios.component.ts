import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from 'src/app/app.roles';
import { UsuarioService } from '../services/usuario.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'], 
  providers: [MessageService] 
})
export class UsuariosComponent implements OnInit, OnDestroy {
  roles= [Role.BODEGUERO,Role.CAJERO,Role.EMPLEADO, Role.VENTAS]
  constructor(public usuarioService:UsuarioService, private ref: DynamicDialogRef, private messageService: MessageService) {}
  ngOnDestroy(): void {
    this.usuarioService.form.reset()
  }
  ngOnInit(): void {}

  guardar(){
    this.usuarioService.create().subscribe(resp=>{
      this.usuarioService.form.reset();
      this.messageService.add({severity:'success', summary:'Registrado', detail: `se ha creado el empleado ${resp.data.empleado.nombre} con usuario ${resp.data.user}`});      
    }, e =>{
      console.log("error:",e.error)
      this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
    });        
  }

  edit(){
    this.usuarioService.create().subscribe(resp=>{
      this.usuarioService.form.reset();
      this.ref.close(resp)      
    }, e =>{
      this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
    });
  }

  campoValido(campo:string, error:string){
    return this.usuarioService.form.get(campo)?.errors?.[error]
            && this.usuarioService.form.get(campo)?.touched;
  }

  onUpload(event:any) {
    this.usuarioService.form.patchValue({
      foto: event
    })
    console.log(this.usuarioService.form.value);
    
  }
}


