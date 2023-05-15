import { Component, OnInit } from '@angular/core';
import { Producto } from '../../producto/intefaces/producto';
import { ProductoService } from '../../producto/services/producto.service';
import { TipoPrecio } from '../../producto/services/tipo-precio.service';
import { Tipo_Precio } from '../interfaces/tipo-precio';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-precio-list',
  templateUrl: './precio-list.component.html',
  styleUrls: ['./precio-list.component.css']
})
export class PrecioListComponent implements OnInit {

  Producto:Producto[] = [];
  tipoPrecio:Tipo_Precio [] = []
  sizes: any[] = [];
  selectedSize: any = '';

  constructor(public productoService:ProductoService,
              private tipoPrecioService:TipoPrecio,
              private messageService:MessageService) { }

  ngOnInit(): void {
    this.getProductos()
    this.sizes = [
      { name: 'Small', class: 'p-datatable-sm' },
      { name: 'Normal', class: '' },
      { name: 'Large',  class: 'p-datatable-lg' }
  ];
  this.getTipoPrecio()
  }

  getProductos(){
    this.productoService.getProductos().subscribe(data=>{
      this.Producto = data
      console.log(this.Producto[0].precio.length)
    })
  }

  getTipoPrecio(){
    this.tipoPrecioService.getTipoPrecios().subscribe(data=>{
      this.tipoPrecio = data
      //console.log('object :>> ', this.tipoPrecio);
    })
  }

  verPrecios(data:Producto){
    this.productoService.resetFormBuilder()
    this.productoService.configEdit()
    this.productoService.llenarFormulario(data)
  }

  borrarPrecio(i:number){
    this.productoService.Precios.removeAt(i)
  }

  actualizarPrecios(){
    this.productoService.updateProducto()
    .subscribe(
      res =>{ 
          this.messageService.add({key: 'tc', severity:'success', summary: 'Modificado',
                                   detail: 'Precios', life:1500,closable:true});
      },
      err=>{
        console.log(err)
        this.messageService.add({key: 'tc', severity:'error', summary: 'Error',
        detail: `${err.name}`, life:3500,closable:true});
      }
    )
  }

}
