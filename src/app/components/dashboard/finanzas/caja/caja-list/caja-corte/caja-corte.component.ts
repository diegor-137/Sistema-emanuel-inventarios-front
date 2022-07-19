import { Component, OnInit } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/app.roles';
import { PasswordDialogComponent } from 'src/app/components/dashboard/global-components/password-dialog/password-dialog.component';
import { CajaCorteService } from '../../services/caja-corte.service';

@Component({
  selector: 'app-caja-corte',
  templateUrl: './caja-corte.component.html',
  styleUrls: ['./caja-corte.component.css'],
  providers: [MessageService, DialogService]
})
export class CajaCorteComponent implements OnInit {


  disabled: boolean = true;
  balance!:number
  load=false
  constructor(public readonly cajaCorteService: CajaCorteService, 
              private messageService: MessageService, 
              public ref: DynamicDialogRef, 
              public dialogService: DialogService) { }

  ngOnInit(): void {
    this.ultimoMovimiento()
  }

  ultimoMovimiento(){
    this.cajaCorteService.ultimoMovimiento().subscribe(resp =>{
      this.balance = resp
      this.load = true
    });
  }

  create(){
    const ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Realizar Corte',
      width: '30%',
      data: [Role.CAJERO, Role.ADMIN]
    })
    
    ref.onClose.subscribe((resp:any)=>{
        if(resp){
          this.cajaCorteService.create(resp).subscribe(()=>{
            this.ref.close();
            this.messageService.add({severity:'success', summary:'Corte Realizado', detail: 'El corte ya se ha realizado.'});
            this.cajaCorteService.formCorte.reset()
          }, e => console.log(e))          
        }
    })
  }

}
