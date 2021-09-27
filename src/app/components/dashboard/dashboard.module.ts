import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { IniciorhComponent } from './recursos-humanos/iniciorh/iniciorh.component';
import { DepartamentoFormComponent } from './recursos-humanos/departamento/form/departamento-form/departamento-form.component';
import { DepartamentoComponent } from './recursos-humanos/departamento/departamento.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    AlmacenComponent,
    VentasComponent,
    ComprasComponent,
    IniciorhComponent,
    DepartamentoComponent,
    DepartamentoFormComponent,
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
