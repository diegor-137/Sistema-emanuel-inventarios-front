import { Component, OnInit } from '@angular/core';
import { FinanzasReportService } from '../services/finanzas-report.service';
import { Empleado } from '../../../recursos-humanos/empleado/interfaces/empleado';
import { Cliente } from '../../../ventas/cliente/interfaces/cliente';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportViewComponent } from '../../report-view/report-view.component';
import { resultUtility } from '../../reports-templates/resultUtility';


@Component({
  selector: 'app-utilidad',
  templateUrl: './utilidad.component.html',
  styleUrls: ['./utilidad.component.css'],
  providers: [DialogService]
})
export class UtilidadComponent implements OnInit {

  load!:boolean;

  empleados!:Empleado[]
  clientes!:Cliente[]

  constructor(public finanzasReportService:FinanzasReportService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getEmpleado()
  }

  getEmpleado(){
    this.finanzasReportService.getEmpleados().subscribe(data=>{
      this.empleados = data;      
    })
  }

  getClientes(event:any){
    this.finanzasReportService.getClientes(event.query).subscribe(data=>{
      this.clientes = data
    })
  }


  async utilidadDetallada(){
    this.finanzasReportService.utilidadDetallada().subscribe(async data=>{
      console.log(data);
      const base64 = await resultUtility(data);  
      base64.getBase64(data=>{
        this.show(data)
      })
    })
  }

  show(src:string){
    const ref = this.dialogService.open(ReportViewComponent, {
      data:{src},
      header: 'Reporte',
      width: '80%'
    })
  }

}
