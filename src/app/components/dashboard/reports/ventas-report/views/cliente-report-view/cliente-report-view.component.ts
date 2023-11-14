import { Component, OnInit } from '@angular/core';
import { ClienteReportService } from '../../services/cliente-report.service';
import { DialogService } from 'primeng/dynamicdialog';
import { resultlistadoClientes } from '../../templates/clientes/ClientesList';
import { ReportViewComponent } from '../../../report-view/report-view.component';
import { resultCreditosClientes } from '../../templates/clientes/CreditosClientesList';

@Component({
  selector: 'app-cliente-report-view',
  templateUrl: './cliente-report-view.component.html',
  styleUrls: ['./cliente-report-view.component.css'],
  providers: [DialogService]
})
export class ClienteReportViewComponent implements OnInit {

  constructor(public clienteReportService:ClienteReportService,
              public dialogService:DialogService) { }

  ngOnInit(): void {
  }

  
  listadoClientes(){
    this.clienteReportService.listadoClientes().subscribe(async data=>{
      console.log(data)
      const base64 = await resultlistadoClientes(data)
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }

  creditosActivos(){
      this.clienteReportService.listadoCreditos().subscribe(async data=>{
      console.log(data)
      const base64 = await resultCreditosClientes(data)
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
