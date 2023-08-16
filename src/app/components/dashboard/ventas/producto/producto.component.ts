import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Precio } from '../../almacen/precio/interfaces/precio';
import { Producto } from '../../almacen/producto/intefaces/producto';
import { VentaService } from '../venta/services/venta.service';
import { ProductoService } from '../../almacen/producto/services/producto.service';
import { InventarioPorProductoComponent } from '../../almacen/producto/inventario-por-producto/inventario-por-producto.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  Producto:Producto[] = []
  Precios:Precio[] = []
  Listado:any[]=[]

  displayedColumns: string[] = ['id', 'nombre','precio','inventario','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public service:VentaService,
    public serviceProducto:ProductoService,
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
      //console.log('object  :>> ',this.Producto);
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
    let valid:boolean=true
    var prod = this.service.formCantidadProd.value
    this.Listado = this.service.form.value
    for (let index = 0; index < this.service.form.value.detalle.length; index++) {
        var dato = this.service.form.value.detalle[index]
        if (dato.producto === prod.id_venta) {
          valid = false
          dato.cantidad = dato.cantidad + prod.cantidad
          console.log("duplicado")
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
