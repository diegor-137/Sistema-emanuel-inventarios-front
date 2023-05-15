import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionGlobalComponent } from './configuracion/configuracion-global/configuracion-global.component';
import { ConfiguracionesComponent } from './configuraciones.component';
import { RegionListComponent } from './region/region-list/region-list.component';

const routes: Routes = [
  {
    path: '', component: ConfiguracionesComponent, children: [
      { path: '', component: ConfiguracionGlobalComponent },
      { path:'region', component: RegionListComponent}
    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule { }
