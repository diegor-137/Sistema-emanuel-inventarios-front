import { Component, OnInit } from '@angular/core';
import { CompraReportService } from '../../services/compra-report.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportViewComponent } from '../../../report-view/report-view.component';
import { resultCompras } from '../../templates/compras/compras';

@Component({
  selector: 'app-compra-report-view',
  templateUrl: './compra-report-view.component.html',
  styleUrls: ['./compra-report-view.component.css'],
  providers: [DialogService]
})
export class CompraReportViewComponent implements OnInit {

  constructor( public compraReportService:CompraReportService,
               public dialogService:DialogService) { }

  ngOnInit(): void {
  }

    ListadoCompras(){
      this.compraReportService.ComprasPorSucursal().subscribe(async data=>{
        console.log(data)
        const base64 = await resultCompras(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }

  ListadoComprasAnuladas(){
    this.compraReportService.ComprasPorSucursalAnuladas().subscribe(async data=>{
        console.log(data)
        const base64 = await resultCompras(data)
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
