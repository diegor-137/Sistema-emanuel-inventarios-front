import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { UtilidadComponent } from './finanzas-report/utilidad/utilidad.component';


const routes: Routes = [
  {
    path: '', component: ReportsComponent, children: [
      { path: '', component: UtilidadComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
