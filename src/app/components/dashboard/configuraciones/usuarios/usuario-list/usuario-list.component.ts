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

  displayModal=false
  usuarios!:User[]
  loading: boolean = true;
  uploaded:boolean = false
  constructor(public usuarioService:UsuarioService, public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(){
    this.usuarioService.form.reset();
    this.usuarioService.findAll().subscribe(user=>{      
      this.usuarios = user
      this.loading = false;
    })
  }

  editFoto(usuario:User, form:any){
    this.clearValidation()        
    this.usuarioService.form.patchValue(usuario)
    this.displayModal=true
  }

  onUpload(event:any, form:any){
    this.usuarioService.uploadFile(event.files[0]).subscribe((resp)=>{      
      //this.messageService.add({severity:'success', summary:'Registrado', detail: 'Foto actualizado'});
      this.usuarioService.form.controls.empleado.get('foto')?.setValue(resp);   
      form.clear();
      this.uploaded=true
      form.uploadedFileCount = 0;
      setTimeout(()=>{
        this.uploaded=false
      },3000)
    })    
  }


  closeDialog(form:any){
    this.displayModal=false;
    this.uploaded=false
    this.usuarioService.form.reset();     
    this.setValidators();
    this.findAll()
    form.clear();
    form.uploadedFileCount = 0;
  }

  openEdit(user:User){    
    this.clearValidation()    
    this.usuarioService.form.patchValue(user); 
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
        this.setValidators();        
    })
  }

  clearValidation(){
    this.usuarioService.form.controls["user"].clearAsyncValidators();   
    this.usuarioService.form.controls.empleado.get('email')?.clearAsyncValidators() ;
    this.usuarioService.form.updateValueAndValidity();
  }

  setValidators(){
    this.usuarioService.form.controls["user"].setAsyncValidators([<AsyncValidatorFn>this.usuarioService.userNameAsyncValidator]);
    this.usuarioService.form.controls.empleado.get('email')?.setAsyncValidators([<AsyncValidatorFn>this.usuarioService.userEmailAsyncValidator]);
    this.usuarioService.form.updateValueAndValidity();
  }


}
