import { Component, OnInit } from '@angular/core';
import { Caja, Ingreso } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';
import { IngresosService } from './ingresos.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordDialogComponent } from '../../../global-components/password-dialog/password-dialog.component';
import { Role } from '../../../../../app.roles';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css'],
  providers: [DialogService, MessageService]
})
export class IngresosComponent implements OnInit {

  dialog!: boolean;
  cajasList!:Caja[]
  ingresos!:Ingreso[]
  get usuario(){
    return this.authService.usuario;
  }
  constructor(public ingresosService:IngresosService, 
              private readonly cajaConfigService:CajaConfigService, 
              public dialogService: DialogService,
              private messageService: MessageService,
              private readonly authService:AuthService) { }

  ngOnInit(): void {
    this.cajero()
  }

  cajero(){
    const roles = [Role.CAJERO.toString()]
    if (this.usuario.role.some(r =>roles.includes(r))) {
      this.ingresosService.form.get('caja')?.clearValidators();
      this.ingresosService.form.get('caja')?.updateValueAndValidity();
    }else{
      this.ingresosService.form.controls.caja.setValue(null)
      this.cajas()
    }
  } 

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => this.cajasList = resp)
  }

  getIngresos(){
    this.ingresosService.getIngresos().subscribe(resp=> this.ingresos = resp)
  }

  abrir() {
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.ingresosService.formIngreso.reset()
  }

  saveIngreso(){
    const ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Generar Ingreso.',
      width: '30%',
      data: [Role.CAJERO]
    })
    
    ref.onClose.subscribe((resp:any)=>{
        if(resp){
          this.ingresosService.crearIngreso(resp).subscribe(()=>{
            this.messageService.add({severity:'success', summary:'Corte Realizado', detail: 'El corte ya se ha realizado.'});
            this.ingresosService.formIngreso.reset()
            this.dialog = false;                        
          }, e =>{
            this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
          })                    
        }
    })
    
  }

  campoValido(campo:string){
    return this.ingresosService.formIngreso.get(campo)?.errors
            && this.ingresosService.formIngreso.get(campo)?.touched;
  }

}
