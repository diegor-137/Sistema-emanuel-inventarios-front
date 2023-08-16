import { Component, OnInit } from '@angular/core';
import { Producto } from '../../producto/intefaces/producto';
import { ProductoService } from '../../producto/services/producto.service';
import { TipoPrecio } from '../../producto/services/tipo-precio.service';
import { Tipo_Precio } from '../interfaces/tipo-precio';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

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
              private messageService:MessageService,
              private toastr:ToastrService,) { }

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
    console.log(data.costo.length)
    if (data.costo.length === 0 || data.costo[0].costo_prom == 0) {
      this.toastr.error("producto aun no tiene costo","No procede",{
        positionClass:'toast-bottom-right'      
      })
    }else{
      console.log(data.costo)
      this.productoService.resetFormBuilder()
      this.productoService.configEdit()
      this.productoService.llenarFormulario(data)
    }

  }

  borrarPrecio(i:number){
    this.productoService.Precios.removeAt(i)
  }

  actualizarPrecios(){
    this.productoService.updateProducto()
    .subscribe(
      res=>{
        this.toastr.success( `Modificado con Exito`,`${res.nombre} modificado`,{
          positionClass:'toast-bottom-right'      
        })    
      },
      err => {
        this.toastr.error(`${err.message}`, `Succedio un error`,{
          positionClass:'toast-bottom-right'      
        })
        console.log(err);
      }
    )   
  }

}
