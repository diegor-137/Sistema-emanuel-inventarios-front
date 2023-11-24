import { Component, OnInit } from '@angular/core';
import { ProductoReportService } from '../../services/producto-report.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportViewComponent } from '../../../report-view/report-view.component';
import { InventarioReportService } from '../../services/inventario-report.service';
import { resultInventarioPorSucursal } from '../../templates/inventario/InventarioporSucursal';
import { resultInventarioPorRegion } from '../../templates/inventario/InventarioporRegion';
import { Producto } from 'src/app/components/dashboard/almacen/producto/intefaces/producto';
import { resultKardexPorRegion } from '../../templates/inventario/kardexPorRegion';
import { resultKardexPorSucursal } from '../../templates/inventario/kardexPorSucursal';

@Component({
  selector: 'app-inventario-report-view',
  templateUrl: './inventario-report-view.component.html',
  styleUrls: ['./inventario-report-view.component.css'],
  providers: [DialogService]
})
export class InventarioReportViewComponent implements OnInit {

  productos!:Producto[]

  constructor(public inventarioService:InventarioReportService,
              public dialogService:DialogService) { }

  ngOnInit(): void {
  }

  getProductos(event:any){
    this.inventarioService.getProductos(event.query).subscribe(data=>{
      this.productos = data
    })
  }

  ListadoInventarioPorSucursal(){
    this.inventarioService.ListadoInventarioPorSuc().subscribe(async data=>{
      console.log(data)
      const base64 = await resultInventarioPorSucursal(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }

  ListadoInventarioPorRegion(){
    this.inventarioService.ListadoInventarioPorRegion().subscribe(async data=>{
      console.log(data)
      const base64 = await resultInventarioPorRegion(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }


  KardexPorRegion(){
    this.inventarioService.kardexPorRegion().subscribe(async data=>{
      console.log(data)
      const base64 = await resultKardexPorRegion(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }


  KardexPorSucursal(){
     this.inventarioService.kardexPorSucursal().subscribe(async data=>{
      console.log(data)
      const base64 = await resultKardexPorSucursal(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    }) 
  }


  show(src:string){
    const ref = this.dialogService.open(ReportViewComponent,{
      data:{src},
      header: 'Reporte',
      width: '80%'

    })
  }

}
