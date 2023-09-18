import { Component, OnInit } from '@angular/core';
import { ProductoReportService } from '../../services/producto-report.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportViewComponent } from '../../../report-view/report-view.component';
import { resultListGeneralProduct } from '../../templates/productos/ProductsListGeneral';
import { resultListPrecios } from '../../templates/productos/PreciosList';

@Component({
  selector: 'app-producto-report-view',
  templateUrl: './producto-report-view.component.html',
  styleUrls: ['./producto-report-view.component.css'],
  providers: [DialogService]
})
export class ProductoReportViewComponent implements OnInit {

  constructor(public productoReportService:ProductoReportService,
              public dialogService:DialogService) { }

  ngOnInit(): void {
  }

  ListadoGeneralProductos(){
    this.productoReportService.ListadoProductos().subscribe(async data=>{
      const base64 = await resultListGeneralProduct(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }

  ListadoProductosEliminados(){
        this.productoReportService.ListadoProductosEliminados().subscribe(async data=>{
      const base64 = await resultListGeneralProduct(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }

ListadoPrecios(){
        this.productoReportService.ListadoPrecios().subscribe(async data=>{
          console.log(data)
      const base64 = await resultListPrecios(data)
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
