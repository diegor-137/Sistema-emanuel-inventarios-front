import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordDialogComponent } from '../../../global-components/password-dialog/password-dialog.component';
import { GastoService } from '../services/gasto.service';
import { Role } from '../../../../../app.roles';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Caja, Gasto } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';
import { AuthService } from '../../../../../auth/services/auth.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [DialogService, MessageService]
})
export class GastosComponent implements OnInit {
  checked: boolean = false;
  dialog!: boolean;
  gastos: Gasto[]=[];

  selectedGasto!: any[];

  cajasList!:Caja[]

  get usuario(){
    return this.authService.usuario;
  }

  total!:number;
  deleteRespon!:Array<any>
  

  constructor(public readonly gastoService:GastoService,
              public dialogService: DialogService,
              private messageService: MessageService,
              private readonly cajaConfigService:CajaConfigService, 
              private readonly authService:AuthService
    ) { }

  ngOnInit(): void {
    this.cajero()
  }

  cajero(){
    const roles = [Role.CAJERO.toString()]
    if (this.usuario.role.some(r =>roles.includes(r))) {
      this.gastoService.form.get('caja')?.clearValidators();
      this.gastoService.form.get('caja')?.updateValueAndValidity();
    }else{
      this.gastoService.form.controls.caja.setValue(null)
      this.cajas()
    }
  }

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => this.cajasList = resp)
  }

  saveGasto(){
    const ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Generar Gasto.',
      width: '30%',
      data: [Role.CAJERO, Role.ADMIN]
    })
    ref.onClose.subscribe((resp:any)=>{
        if(resp){
          this.gastoService.formGasto.controls['token'].setValue(resp.accessToken);
          this.gastoService.crearGasto(this.gastoService.formGasto.value).subscribe((resp)=>{
            this.messageService.add({severity:'success', summary:'Corte Realizado', detail: 'El corte ya se ha realizado.'});
            this.gastoService.formGasto.reset()
            this.dialog = false;                        
          }, e =>{
            this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
          })                    
        }
    })
  }

  onSelect(event:any, form:any){
    this.gastoService.formGasto.controls.fotoSend.setValue(event.currentFiles[0])   
  }

  deleteGasto(gasto:Gasto){
    const ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Eliminar gasto.',
      width: '30%',
      data: [Role.CAJERO]
    })
    ref.onClose.subscribe((resp:any)=>{
      if(resp){
        this.gastoService.delete(gasto.id).subscribe(()=>{
          this.messageService.add({severity:'success', summary:'Gasto eliminado', detail: 'El gasto ya ha sido eliminado'});                     
          this.allGastos()
        }, e => console.log(e))   
        console.log(resp);               
      }
  })

  }

  allGastos(){
    if(this.checked){
      this.gastoService.findAllDeletedGastos().subscribe(resp=>{
        this.gastos = resp
        this.total = this.gastos.reduce((sum, a)=> sum +  Number(a.monto), 0.00);                      
       })
    }else{
      this.gastoService.allGastos().subscribe(resp=>{
        this.gastos = resp
        this.total = this.gastos.reduce((sum, a)=> sum +  Number(a.monto), 0.00);                      
       })
    }     
  }

  deleteResponsible(gasto:Gasto){
    this.deleteRespon =[
      {
        nombre: gasto.deleteResponsible?.nombre,
        apellido: gasto.deleteResponsible?.apellido,
        fecha: gasto.deletedAt
      }
    ]
    
  }


  abrir() {
    this.dialog = true;
  }


  hideDialog() {
    this.dialog = false;
    this.gastoService.formGasto.reset()
  }

  campoValido(campo:string){
    return this.gastoService.formGasto.get(campo)?.errors
            && this.gastoService.formGasto.get(campo)?.touched;
  }
}
