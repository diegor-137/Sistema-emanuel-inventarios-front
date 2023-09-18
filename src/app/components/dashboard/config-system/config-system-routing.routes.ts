import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigSystemComponent } from './config-system.component';
import { SucursalesListComponent } from './sucursales/sucursales-list/sucursales-list.component';
import { ConfigGlobalSistemComponent } from './config-global-sistem/config-global-sistem.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { RegionListComponent } from './region/region-list/region-list.component';

const routes: Routes = [
  {
    path: '', component: ConfigSystemComponent, children: [
      {path: 'global', component: ConfigGlobalSistemComponent},
      {path: 'sucursales', component: SucursalesListComponent},
      { path: 'listado-usuarios', component: UsuarioListComponent},
      { path: 'listado-region', component: RegionListComponent},
    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigSystemRoutingModule { }
