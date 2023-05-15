import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from '../interfaces/user.interface';
import { UsuarioService } from '../services/usuario.service';
import { UsuariosComponent } from '../usuario-form/usuarios.component';
import { Validator, Validators, AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css'],
  providers: [DialogService, MessageService]
})
export class UsuarioListComponent implements OnInit {

  usuarios!:User[]
  constructor(public usuarioService:UsuarioService, public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.usuarioService.form.reset();
    this.usuarioService.findAdmins().subscribe(user=>{ 
      this.usuarios = user
      //this.loading = false;
    })
  }

  open(){
    const ref = this.dialogService.open(UsuariosComponent, {
      header: 'Crear Administrador',
      width: '40%',      
    })
    
    ref.onClose.subscribe((resp)=>{    
      if(resp){
        this.messageService.add({severity:'success', summary:'Registrado', detail: `Se ha registrado el empleado`});
        this.findAll()
      }   
        this.usuarioService.form.reset();     
       
    })

  }

  openEdit(user:User){    
    this.usuarioService.form.patchValue(user); 
    this.usuarioService.form.controls['userSave'].patchValue(user.user);
    this.usuarioService.form.controls['emailSave'].patchValue(user.empleado.email);
    const ref = this.dialogService.open(UsuariosComponent, {
      header: 'Actualizar usuario',
      width: '40%',      
    })
    
    ref.onClose.subscribe((resp)=>{    
      if(resp){
        this.messageService.add({severity:'success', summary:'Registrado', detail: `Se ha actualizado el empleado ${resp.data.empleado.nombre} con usuario ${resp.data.user}`});
        this.findAll()
      }   
        this.usuarioService.form.reset();     
    })
  }
}
