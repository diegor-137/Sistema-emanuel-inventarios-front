import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosHumanosRoutingModule } from './recursos-humanos-routing.module';
import { IniciorhComponent } from './iniciorh/iniciorh.component';
import { DepartamentoComponent } from './departamento/departamento-list/departamento.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { PuestoFormComponent } from './puesto/puesto-form/puesto-form.component';
import { PuestoListComponent } from './puesto/puesto-list/puesto-list.component';

import { SharedModule } from '../../shared/shared.module';
import { EmpleadoFormComponent } from './empleado/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { RecursosHumanosComponent } from './recursos-humanos.component';


@NgModule({
  declarations: [
    RecursosHumanosComponent,
    IniciorhComponent,
    DepartamentoComponent,
    DepartamentoFormComponent,
    PuestoFormComponent,
    PuestoListComponent,
    EmpleadoFormComponent,
    EmpleadoListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecursosHumanosRoutingModule,
 
  ]
})
export class RecursosHumanosModule { }
