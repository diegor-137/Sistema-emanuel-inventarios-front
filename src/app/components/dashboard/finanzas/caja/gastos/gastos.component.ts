import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PasswordDialogComponent } from '../../../global-components/password-dialog/password-dialog.component';
import { GastoService } from '../services/gasto.service';
import { Role } from '../../../../../app.roles';
import { MessageService } from 'primeng/api';
import { Caja, Gasto } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css'],
  providers: [DialogService, MessageService]
})
export class GastosComponent implements OnInit {

  dialog!: boolean;

  gastos: Gasto[]=[];

  selectedGasto!: any[];

  cajasList!:Caja[]

  constructor(public readonly gastoService:GastoService,
              public dialogService: DialogService,
              private messageService: MessageService,
              private readonly cajaConfigService:CajaConfigService

    ) { }

  ngOnInit(): void {
    this.cajas()
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
          this.gastoService.crearGasto(resp).subscribe(()=>{
            this.messageService.add({severity:'success', summary:'Corte Realizado', detail: 'El corte ya se ha realizado.'});
            this.gastoService.formGasto.reset()            
          }, e => console.log(e))          
        }
    })
    
  }

  allGastos(){
     this.gastoService.allGastos().subscribe(resp=>{
      this.gastos = resp                      
     })
  }


  abrir() {
    this.dialog = true;
  }


  hideDialog() {
    this.dialog = false;
  }

  campoValido(campo:string){
    return this.gastoService.formGasto.get(campo)?.errors
            && this.gastoService.formGasto.get(campo)?.touched;
  }
  

}
