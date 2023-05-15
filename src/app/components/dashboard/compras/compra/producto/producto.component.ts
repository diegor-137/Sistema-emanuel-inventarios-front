import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from '../../../almacen/producto/intefaces/producto';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompraService } from '../services/compra.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { InventarioPorProductoComponent } from '../../../almacen/producto/inventario-por-producto/inventario-por-producto.component';
import { ProductoService } from '../../../almacen/producto/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  Producto:Producto[] = []

  displayedColumns: string[] = ['id', 'nombre','costo','inventario','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public service:CompraService,
              public serviceProducto:ProductoService,
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
      console.log(this.Producto)
      //console.log('object :>> ',this.Producto[0].precio[0].tipoPrecio.id);
      this.dataSource = new MatTableDataSource (this.Producto) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  AgregarDetalle(){
    let valid:boolean=true
    var prod = this.service.formCantidadProd.value

    for (let index = 0; index < this.service.form.value.detalle.length; index++) {
        var dato = this.service.form.value.detalle[index]
        if (dato.producto === prod.id_compra) {
          valid = false
          dato.cantidad = dato.cantidad + prod.cantidad_c
          console.log(dato.cantidad)
          console.log(prod.cantidad)
          this.service.formCantidadProd.reset({
            estado:true
          })
        }
      }
    if (valid){
      this.service.AgregarDetalle()
    }
  }

  close(){
    this.dialogRef.close()
  }

  openExistencia(id:number){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    this.serviceProducto.productoId = id
    console.log(this.serviceProducto.productoId)
    const dialogo = this.dialog.open(InventarioPorProductoComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
    })
  }
}
