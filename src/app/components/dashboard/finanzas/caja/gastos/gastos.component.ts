import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { GastoService } from '../services/gasto.service';
import { CajaConfigService } from '../services/cajaConfig.service';
import { Caja, Gasto } from '../interfaces/caja-interface';
import { PasswordDialogComponent } from '../../../global-components/password-dialog/password-dialog.component';
import { Role } from 'src/app/app.roles';
import { GastoFormComponent } from './gasto-form/gasto-form.component';


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
  cuentaGasto!:Caja
  selectedGasto!: any[];
  load=false

  total!:number;
  deleteRespon!:Array<any>

  items!: MenuItem[];

  constructor(public readonly gastoService:GastoService,
    public dialogService: DialogService,
    private messageService: MessageService,
    private readonly cajaConfigService:CajaConfigService)
    { }

  ngOnInit(): void {}
  
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
      const ref = this.dialogService.open(GastoFormComponent, {
        header: 'Crear Gasto',
        width: '500px',
        contentStyle: {"max-height": "500px", "overflow": "auto"},
        baseZIndex: 10000,
        closable: false
      })
  
      ref.onClose.subscribe(()=>{
      })
    }



}
