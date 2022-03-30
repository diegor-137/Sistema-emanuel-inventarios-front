import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Precio } from '../../almacen/producto/interaces/precio';
import { Producto } from '../../almacen/producto/interaces/producto';
import { VentaService } from '../venta/services/venta.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  Producto:Producto[] = []
  Precios:Precio[] = []

  displayedColumns: string[] = ['id', 'nombre','precio','inventario','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public service:VentaService,
    public dialogRef:MatDialogRef<ProductoComponent>,
    private dialog:MatDialog,
    private toastr:ToastrService) { }

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
      //console.log('object :>> ',this.Producto[0]);
      //console.log('object :>> ',this.Producto[0].inventario[0].cantidad);
      this.dataSource = new MatTableDataSource (this.Producto) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }



  llenarProducto(data:Producto){
    this.service.llenarProducto(data)
    this.Precios = data.precio
  }

  AgregarDetalle(){
    var prod = this.service.formCantidadProd.value
    if (prod.cantidad>prod.inventario.cantidad) {
      this.toastr.error( `Cantidad mayor a la existencia`,`Sin existencia`,{
        positionClass:'toast-bottom-right'      
      })
    }else{
      if (this.service.form.value.detalle.length>0) {
        for (let index = 0; index < this.service.form.value.detalle.length; index++) {
          var dato = this.service.form.value.detalle[index]
          if (prod.id_compra === dato.producto) {
            console.log('Sono iguales');
            dato.cantidad = dato.cantidad + prod.cantidad
            //this.service.form.updateValueAndValidity()
            this.service.formCantidadProd.reset({
              estado:true
            })
            return
          }else{
            //console.log('No son iguales');
            return this.service.AgregarDetalle()
          }
        }
      } else {
        this.service.AgregarDetalle()
      }

    }
  }

  close(){
    this.dialogRef.close()
  }

}
