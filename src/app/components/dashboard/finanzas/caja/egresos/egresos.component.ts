import { Component, OnInit } from '@angular/core';
import { Caja, Egreso } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';
import { EgresosService } from './egresos.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordDialogComponent } from '../../../global-components/password-dialog/password-dialog.component';
import { Role } from '../../../../../app.roles';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css'],
  providers: [DialogService, MessageService]
})
export class EgresosComponent implements OnInit {

  dialog!: boolean;
  cajasList!:Caja[]
  egresos!:Egreso[]
  get usuario(){
    return this.authService.usuario;
  }
  constructor(public egresosService:EgresosService, 
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
      this.egresosService.form.get('caja')?.clearValidators();
      this.egresosService.form.get('caja')?.updateValueAndValidity();
    }else{
      this.egresosService.form.controls.caja.setValue(null)
      this.cajas()
    }
  } 

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => this.cajasList = resp)
  }

  getIngresos(){
    this.egresosService.getEgresos().subscribe(resp=> this.egresos = resp)
  }

  abrir() {
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.egresosService.formEgreso.reset()
  }

  saveIngreso(){
    const ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Generar Ingreso.',
      width: '30%',
      data: [Role.CAJERO]
    })
    
    ref.onClose.subscribe((resp:any)=>{
        if(resp){
          this.egresosService.crearEgreso(resp).subscribe(()=>{
            this.messageService.add({severity:'success', summary:'Corte Realizado', detail: 'El corte ya se ha realizado.'});
            this.egresosService.formEgreso.reset()
            this.dialog = false;                        
          }, e =>{
            this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
          })                    
        }
    })
    
  }

  campoValido(campo:string){
    return this.egresosService.formEgreso.get(campo)?.errors
            && this.egresosService.formEgreso.get(campo)?.touched;
  }

}
