import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigSystemComponent } from './config-system.component';
import { ConfigSystemRoutingModule } from './config-system-routing.routes';
import { PrimeModule } from '../../prime/prime.module';
import { ConfigGlobalSistemComponent } from './config-global-sistem/config-global-sistem.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuariosComponent } from './usuarios/usuario-form/usuarios.component';
import { RegionListComponent } from './region/region-list/region-list.component';



@NgModule({
  declarations: [
    ConfigSystemComponent,
    ConfigGlobalSistemComponent,
    SucursalesListComponent,
    UsuarioListComponent,
    UsuariosComponent,
    RegionListComponent
  ],
  imports: [
    CommonModule,
    ConfigSystemRoutingModule,
    PrimeModule,
    SharedModule,
    PipesModule
  ]
})
export class ConfigSystemModule { }
