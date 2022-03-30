import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../almacen/producto/interaces/producto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompraService } from '../services/compra.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  Producto:Producto[] = []

  displayedColumns: string[] = ['id', 'nombre','costo','marca','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public service:CompraService,
              public dialogRef:MatDialogRef<ProductoComponent>,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getProductos()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProductos(){
    this.service.getProductos().subscribe(data=>{
      this.Producto = data
      //console.log('object :>> ',this.Producto[0].precio[0].tipoPrecio.id);
      this.dataSource = new MatTableDataSource (this.Producto) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  close(){
    this.dialogRef.close()
  }
}
