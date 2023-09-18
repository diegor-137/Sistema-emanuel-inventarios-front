import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { UtilidadComponent } from './finanzas-report/utilidad/utilidad.component';
import { ProductoReportViewComponent } from './almacen-report/views/producto-report-view/producto-report-view.component';
import { InventarioReportViewComponent } from './almacen-report/views/inventario-report-view/inventario-report-view.component';
import { ProveedorReportViewComponent } from './compras-report/views/proveedor-report-view/proveedor-report-view.component';
import { CompraReportViewComponent } from './compras-report/views/compra-report-view/compra-report-view.component';


const routes: Routes = [
  {
    path: '', component: ReportsComponent, children: [
      { path: '', component: UtilidadComponent },
      { path: 'productos-report', component: ProductoReportViewComponent },
      { path: 'inventario-report', component: InventarioReportViewComponent },
      { path: 'proveedor-report', component: ProveedorReportViewComponent },
      { path: 'compra-report', component: CompraReportViewComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
