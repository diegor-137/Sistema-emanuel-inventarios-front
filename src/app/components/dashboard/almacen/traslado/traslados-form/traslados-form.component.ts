import { Component, OnInit } from '@angular/core';
import { TrasladoService } from '../service/traslado.service';
import { FormArray } from '@angular/forms';
import { Producto, Sucursal, Traslado } from '../interfaces/traslado';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnvioService } from '../service/envio.service';


@Component({
  selector: 'app-traslados-form',
  templateUrl: './traslados-form.component.html',
  styleUrls: ['./traslados-form.component.css']
})
export class TrasladosFormComponent implements OnInit {

  transactions:boolean;
  readonly!:boolean
  sucursales!:Sucursal[]
  productos!:Producto[]
  productoSelected!:Producto
  envio:boolean = false;
  recepcion:boolean = false;
  res=false;
  

  constructor(public trasladoService:TrasladoService, 
              private messageService: MessageService, 
              public ref: DynamicDialogRef, 
              public config: DynamicDialogConfig,
              public envioService:EnvioService) {
    this.transactions = this.config.data.transactions
    this.envio = this.config.data?.envio
    this.recepcion = this.config.data?.recepcion
    this.res = this.config.data?.res
    this.readonly = this.trasladoService.form.get('readonly')!.value
    this.trasladoService.sucursalesPorRegion().subscribe(resp=>{
      this.sucursales = resp
    })
  }

  ngOnInit(): void {
  }

  get detalle(): FormArray {
    return this.trasladoService.form.get("detalle") as FormArray;
  }

  filterProducto(event:any){
    this.trasladoService.findNameAutoProducto(event.query).subscribe(res=>{
      console.log(res);
      this.productos = res;
    })  
  }

  agregarDetalle(){
    let valid:boolean=true
    const producto = this.productoSelected; 
    const detalle={cantidad:1, producto:{ id:producto.id, nombre:producto.nombre}}

    for (let index = 0; index < this.trasladoService.form.value.detalle.length; index++) {
        var dato = this.trasladoService.form.value.detalle[index]
        if (dato.producto.id === producto.id) {
          valid = false
          var cantidad = Number(dato.cantidad + 1)
          this.detalle.at(index).patchValue({cantidad})
        }
      }
    if (valid){
        this.trasladoService.agregarDetalle(detalle);
    }
  }

  borrarDet(i:number){
    this.detalle.removeAt(i)
  }

  createOne(){
    this.trasladoService.createOne().subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Traslado creado!'});
      this.ref.close()
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     })
  }

  autorizarTraslado(){
    this.trasladoService.autorizarTraslado().subscribe(()=>{
      console.log('autorizado');
      
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Traslado autorizado!'});
      this.ref.close()
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     })
  }

  noAutorizar(){
  }

  generarEnvio(){  
    const traslado:Traslado = this.trasladoService.form.value;
    this.envioService.form.patchValue({traslado});
    this.envioService.create().subscribe(()=>{
      this.ref.close()
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'El envio ha sido creado!'});
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     }) 
  }

  generarRecepcion(){
    this.envioService.createRecepcion().subscribe(()=>{
      this.ref.close()
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'El envio ha sido creado!'});
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     }) 
  }
}
