import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ProveedorReportService } from '../../services/proveedor-report.service';
import { resultlistadoProveedores } from '../../templates/proveedores/ProveedorList';
import { ReportViewComponent } from '../../../report-view/report-view.component';
import { resultCreditosActivos } from '../../templates/compras/creditosActivos';

@Component({
  selector: 'app-proveedor-report-view',
  templateUrl: './proveedor-report-view.component.html',
  styleUrls: ['./proveedor-report-view.component.css'],
  providers: [DialogService]
})
export class ProveedorReportViewComponent implements OnInit {

  constructor(public proveedorReportService:ProveedorReportService,
              public dialogService:DialogService) { }

  ngOnInit(): void {
  }

  ListadoProveedores(){
      this.proveedorReportService.listadoProveedores().subscribe(async data=>{
      console.log(data)
      const base64 = await resultlistadoProveedores(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }


    creditosActivos(){
      this.proveedorReportService.creditosActivos().subscribe(async data=>{
      console.log(data)
      const base64 = await resultCreditosActivos(data)
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
