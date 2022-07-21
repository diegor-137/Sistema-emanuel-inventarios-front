import { Component, OnInit } from '@angular/core';
import { Producto } from '../interaces/producto';
import { ProductoService } from '../services/producto.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-inventario-list',
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css'],
  providers: [MessageService]
})
export class InventarioListComponent implements OnInit {

  Producto:Producto[] = []
  ProductoSeleccionado:any
  first = 0;
  rows = 10;

  constructor(private service:ProductoService,
              private messageService:MessageService) { }

  ngOnInit(): void {
  this.getProductos()
  }

    getProductos(){
      this.service.getInventario().subscribe(data=>{
        this.Producto = data
      })
    }

  next() {
      this.first = this.first + this.rows;
  }
  prev() {
      this.first = this.first - this.rows;
  }
  reset() {
      this.first = 0;
  }
  isLastPage(): boolean {
      return this.Producto ? this.first === (this.Producto.length - this.rows): true;
  }
  isFirstPage(): boolean {
      return this.Producto ? this.first === 0 : true;
  }

  
    changeInventario(){
      this.service.updateInventario(this.ProductoSeleccionado.id,this.ProductoSeleccionado)
      .subscribe(
        res =>{ 
            this.messageService.add({key: 'tc', severity:'success', summary: 'Modificado',
                                     detail: 'Invetario', life:1500,closable:true});
        },
        err=>{
          console.log(err)
          this.messageService.add({key: 'tc', severity:'error', summary: 'Error',
          detail: `${err.name}`, life:3500,closable:true});
        }
      )
    }

    onEditInit(event:any): void {
      this.ProductoSeleccionado = event.data
    }
  
    onEditCancel():void {
      this.changeInventario()
    }

    onEditComplete(event:Event):void {
      this.changeInventario()
    }
}
