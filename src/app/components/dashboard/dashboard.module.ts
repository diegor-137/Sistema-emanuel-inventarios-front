import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    ComprasComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
  ],
  exports:[
    
  ]
})
export class DashboardModule { }
