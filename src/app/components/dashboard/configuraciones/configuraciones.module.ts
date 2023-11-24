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
import { UsuariosComponent } from './usuarios/usuario-form/usuarios.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ConfigVentasComponent } from './configuracion/config-ventas/config-ventas.component';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    ConfiguracionGlobalComponent,
    RegionListComponent,
    RegionFormComponent,  
    UsuariosComponent,
    UsuarioListComponent,
    ConfigVentasComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule,
    PrimeModule,
    FormsModule,
    SharedModule,
    PipesModule        
  ],
  providers: [DynamicDialogRef]
})
export class ConfiguracionesModule { }
