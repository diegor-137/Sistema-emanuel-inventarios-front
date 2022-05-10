import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordDialogService } from '../services/password-dialog.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent implements OnInit {

  form: FormGroup
  data:any
  constructor(private fb: FormBuilder,private service:PasswordDialogService, private messageService: MessageService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  displayBasic!: boolean;
  showBasicDialog() {
    this.displayBasic = true;
  }

  authorization(){
    const {usuario, password} = this.form.value;
    this.service.authorization(usuario, password).subscribe(resp =>{                   
          this.service.profile(resp.accessToken).subscribe(()=>{          
            this.messageService.add({ severity: 'success', summary: 'Autorizado', detail: 'Con Autorizacion.' })
            this.displayBasic = false;
            this.form.reset();     
          },()=>this.error())
    },()=>{
      this.error()      
    });        
  }

  error(){
    this.messageService.add({ severity: 'error', summary: 'No autorizado', detail: 'Sin autorización.' })
  }


}
