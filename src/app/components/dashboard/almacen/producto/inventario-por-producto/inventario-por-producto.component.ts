import { Component, OnInit,ViewChild } from '@angular/core';
import { Inventario } from '../intefaces/inventario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoService } from '../services/producto.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inventario-por-producto',
  templateUrl: './inventario-por-producto.component.html',
  styleUrls: ['./inventario-por-producto.component.css']
})
export class InventarioPorProductoComponent implements OnInit {

  inventario:Inventario[]= []

  displayedColumns: string[] = ['sucursal','cantidad'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private service:ProductoService,
              public dialogRef:MatDialogRef<InventarioPorProductoComponent>) {

   }

  ngOnInit(): void {
    this.getInventario()
  }

  getInventario(){
    console.log("modulo",this.service.productoId)
    this.service.getInventarioTotalporProducto(this.service.productoId).subscribe(data=>{
      this.inventario = data
      console.log("asdasdas",this.inventario)
      this.dataSource = new MatTableDataSource (this.inventario) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
