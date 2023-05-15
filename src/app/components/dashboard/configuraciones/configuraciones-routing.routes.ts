import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionGlobalComponent } from './configuracion/configuracion-global/configuracion-global.component';
import { ConfiguracionesComponent } from './configuraciones.component';
import { RegionListComponent } from './region/region-list/region-list.component';
import { UsuariosComponent } from './usuarios/usuario-form/usuarios.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';

const routes: Routes = [
  {
    path: '', component: ConfiguracionesComponent, children: [
      { path: '', component: ConfiguracionGlobalComponent },
      { path:'region', component: RegionListComponent},
      { path: 'config', component: ConfiguracionGlobalComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'listado-usuarios', component: UsuarioListComponent }
    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
