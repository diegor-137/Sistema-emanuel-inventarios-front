import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { PrimeModule } from '../../prime/prime.module';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.routes';
import { UtilidadComponent } from './finanzas-report/utilidad/utilidad.component';
import { FormsModule } from '@angular/forms';
import { ReportViewComponent } from './report-view/report-view.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ProductoReportViewComponent } from './almacen-report/views/producto-report-view/producto-report-view.component';
import { InventarioReportViewComponent } from './almacen-report/views/inventario-report-view/inventario-report-view.component';
import { ProveedorReportViewComponent } from './compras-report/views/proveedor-report-view/proveedor-report-view.component';
import { CompraReportViewComponent } from './compras-report/views/compra-report-view/compra-report-view.component';
import { VentaReportViewComponent } from './ventas-report/views/venta-report-view/venta-report-view.component';
import { ClienteReportViewComponent } from './ventas-report/views/cliente-report-view/cliente-report-view.component';




@NgModule({
  declarations: [
ReportsComponent,
UtilidadComponent,
ReportViewComponent,
ProductoReportViewComponent,
InventarioReportViewComponent,
ProveedorReportViewComponent,
CompraReportViewComponent,
VentaReportViewComponent,
ClienteReportViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule, 
    PrimeModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
  ]
})
export class ReportModule { }
