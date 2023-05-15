import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ComprasComponent } from './compras/compras.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { GlobalComponentsModule } from './global-components/global-components.module';

export function tokenGetter() {
  return localStorage.getItem("token");
}
  /* const transportOptions = {
      extraHeaders: {
        Authorization: tokenGetter(),
      }
  } */


//const config: SocketIoConfig = { url: 'http://localhost:91', options: {transportOptions} };

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
    //SocketIoModule.forRoot(config),
    GlobalComponentsModule
  ],
  exports:[
    
  ]
})
export class DashboardModule { }
