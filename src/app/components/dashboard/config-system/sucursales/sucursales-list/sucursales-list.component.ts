import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Sucursal } from '../interfaces/sucursal-interface';
import { SucursalesService } from '../services/sucursales.service';
import { AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-sucursales-list',
  templateUrl: './sucursales-list.component.html',
  styleUrls: ['./sucursales-list.component.css'],
  providers: [MessageService, DialogService]
})
export class SucursalesListComponent implements OnInit {

  sucursales!:Sucursal[]
  dialog=false

  constructor(public readonly sucursalesService:SucursalesService, 
              private messageService: MessageService, 
              public dialogService: DialogService) { }

  ngOnInit(): void {
    this.findAll()
  }

  create(){
    this.sucursalesService.create(this.sucursalesService.form.value).subscribe((sucursal:Sucursal)=>{
      this.messageService.add({severity:'success', summary:'Registrado', detail: `Se ha registrado el sucursal ${sucursal.nombre}`});
      this.close()      
    })
  }

  open(){    
    this.dialog = true;
  }

  findAll(){
    this.sucursalesService.findAll().subscribe(sucursal=>{      
      this.sucursales = sucursal
    })
  }

  close(){
    this.dialog = false
    this.sucursalesService.form.reset();
    this.findAll()
  }

  onSelect(event:any, form:any){
    this.sucursalesService.form.controls.fotoSend.setValue(event.currentFiles[0])   
  }


  openEdit(sucursal:Sucursal){ 
    this.sucursalesService.form.patchValue(sucursal);   
    this.sucursalesService.form.controls['saveNombre'].patchValue(sucursal.nombre)
    this,this.dialog = true;
  }



  campoValido(campo:string, error:string){
    return this.sucursalesService.form.get(campo)?.errors?.[error]
            && this.sucursalesService.form.get(campo)?.touched;
  }

}
