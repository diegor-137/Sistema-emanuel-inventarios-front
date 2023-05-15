import { Component, OnInit, OnDestroy } from '@angular/core';
import { Role } from 'src/app/app.roles';
import { UsuarioService } from '../services/usuario.service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Validators } from '@angular/forms';
import { SucursalesService } from '../../sucursales/services/sucursales.service';
import { SucursalService } from '../../../sucursal/services/sucursal.service';
import { Sucursal } from '../../sucursales/interfaces/sucursal-interface';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'], 
  providers: [MessageService] 
})
export class UsuariosComponent implements OnInit {
  constructor(public usuarioService:UsuarioService, private ref: DynamicDialogRef, private messageService: MessageService, private sucursalesService:SucursalesService) {}

  sucursales!:Sucursal[]
  ngOnInit(): void {
    this.getSucursales()
  }

  guardar(){
    this.usuarioService.form.controls.roles.setValue([Role.ADMIN])    
    this.usuarioService.create(this.usuarioService.form.value).subscribe(resp=>{
      this.usuarioService.form.reset();
      this.messageService.add({severity:'success', summary:'Registrado', detail: `se ha creado el empleado ${resp.data.empleado.nombre} con usuario ${resp.data.user}`});      
    }, e =>{
      this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
    });        
  }

  getSucursales(){
      this.sucursalesService.getSucursales().subscribe(sucursales=>{
        this.sucursales = sucursales
      })
  }

  edit(){
    this.usuarioService.edit(this.usuarioService.form.value).subscribe(resp=>{
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

  onSelect(event:any, form:any){
    this.usuarioService.form.controls.fotoSend.setValue(event.currentFiles[0]);      
  }
}


