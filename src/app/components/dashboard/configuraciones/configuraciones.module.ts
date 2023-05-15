import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones.component';
import { ConfiguracionesRoutingModule } from './configuraciones-routing.routes';
import { FormsModule } from '@angular/forms';

import { ConfiguracionGlobalComponent } from './configuracion/configuracion-global/configuracion-global.component';
import { PrimeModule } from '../../prime/prime.module';
import { SharedModule } from '../../shared/shared.module';
import { RegionListComponent } from './region/region-list/region-list.component';
import { RegionFormComponent } from './region/region-form/region-form.component';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    ConfiguracionGlobalComponent,
    RegionListComponent,
    RegionFormComponent,  
  ],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule,
    PrimeModule,
    FormsModule,
    SharedModule        
  ]
})
export class ConfiguracionesModule { }
