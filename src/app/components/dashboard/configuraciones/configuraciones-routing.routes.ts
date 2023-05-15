import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionGlobalComponent } from './configuracion/configuracion-global/configuracion-global.component';
import { ConfiguracionesComponent } from './configuraciones.component';
import { UsuariosComponent } from './usuarios/usuario-form/usuarios.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';

const routes: Routes = [
  {
    path: '', component: ConfiguracionesComponent, children: [
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
