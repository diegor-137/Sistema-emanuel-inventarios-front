import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordDialogService } from '../services/password-dialog.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css'],
  providers: [MessageService]
})
export class PasswordDialogComponent implements OnInit {

  form: FormGroup
  constructor(private fb: FormBuilder,
              private service:PasswordDialogService, 
              private messageService: MessageService, 
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) 
  {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {}

  authorization(){
    const {usuario, password} = this.form.value;
    this.service.authorization(usuario, password).subscribe(resp =>{                   
          this.service.profile(resp.accessToken).subscribe(resp=>{                                 
            this.roles(resp)     
          },()=>this.error())
    },()=>{
      this.error()      
    });        
  }

  close(){
    this.ref.close()
  }

  roles(resp:any){
    const roles: Array<String> = this.config.data    
    const roleUser: Array<String> = resp.role    
    if (roleUser.some(r =>roles.includes(r))) {
      this.ref.close(resp)
      this.form.reset();
    }else{
      this.messageService.add({ severity: 'error', summary: 'No autorizado', detail: 'No tienes los permisos necesarios.' }) 
    }
  }

  error(){
    this.messageService.add({ severity: 'error', summary: 'No autorizado', detail: 'Sin autorización.' })
  }
}
