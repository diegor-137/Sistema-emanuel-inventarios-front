import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/app.roles';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PasswordDialogComponent } from 'src/app/components/dashboard/global-components/password-dialog/password-dialog.component';
import { GastoService } from '../../services/gasto.service';
import { TipoGasto } from '../../tipo-gasto/interface/tipo-gasto';
import { TipoGastoService } from '../../tipo-gasto/services/tipo-gasto.service';

@Component({
  selector: 'app-gasto-form',
  templateUrl: './gasto-form.component.html',
  styleUrls: ['./gasto-form.component.css'],
  providers: [DialogService, MessageService]
})
export class GastoFormComponent implements OnInit {

  tipoGastos!:TipoGasto[]

  get usuario(){
    return this.authService.usuario;
  }

  constructor(public readonly gastoService:GastoService, 
    public ref: DynamicDialogRef,  
    public dialogService: DialogService,
    private messageService: MessageService,
    private readonly authService:AuthService,
    private tipoGastoService:TipoGastoService
    ) { }

  ngOnInit(): void {
    this.getAllTipoGastos();
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
            this.gastoService.formGasto.reset()
            this.hideDialog();                        
          }, e =>{
            this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
          })                    
        }
    })
  }

  onSelect(event:any){
    this.gastoService.formGasto.controls.fotoSend.setValue(event.currentFiles[0])   
  }

  clear(){
    this.gastoService.formGasto.controls.fotoSend.setValue(null)
  }

  hideDialog() {
    this.ref.close();
    this.gastoService.formGasto.reset()
  }

  campoValido(campo:string){
    return this.gastoService.formGasto.get(campo)?.errors
            && this.gastoService.formGasto.get(campo)?.touched;
  }

  getAllTipoGastos(){
    this.tipoGastoService.getAllTipoGastos().subscribe({next:(resp)=>{
          this.tipoGastos = resp
      }, error:(e)=>{
          console.error(e); 
      }
    })
  }

}
