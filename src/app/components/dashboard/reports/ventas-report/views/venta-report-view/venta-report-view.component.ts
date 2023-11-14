import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportViewComponent } from '../../../report-view/report-view.component';
import { VentaReportService } from '../../services/venta-report.service';
import { resultVentas } from '../../templates/ventas/ventaList';

@Component({
  selector: 'app-venta-report-view',
  templateUrl: './venta-report-view.component.html',
  styleUrls: ['./venta-report-view.component.css'],
  providers: [DialogService]
})
export class VentaReportViewComponent implements OnInit {

  constructor(public ventaReportService:VentaReportService,
              public dialogService:DialogService) { }

  ngOnInit(): void {
  }

  listadoVentas(statusVenta:boolean){
    //true es compra activa, false es compra anulada
    this.ventaReportService.formVenta.value.status = statusVenta
    console.log(this.ventaReportService.formVenta.value.status)
    
    this.ventaReportService.ventasClientes().subscribe(async data=>{
      console.log(data)
      const base64 = await resultVentas(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }


  show(src:string){
    const ref = this.dialogService.open(ReportViewComponent,{
      data:{src},
      header:'Reporte',
      width:'80%'
    })
  }

}
