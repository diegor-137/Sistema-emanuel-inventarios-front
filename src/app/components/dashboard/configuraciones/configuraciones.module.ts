import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguracionesComponent } from './configuraciones.component';
import { ConfiguracionesRoutingModule } from './configuraciones-routing.routes';
import { FormsModule } from '@angular/forms';

import { ConfiguracionGlobalComponent } from './configuracion/configuracion-global/configuracion-global.component';
import { PrimeModule } from '../../prime/prime.module';
import { SharedModule } from '../../shared/shared.module';
import { PasswordDialogComponent } from './global-components/password-dialog/password-dialog.component';

@NgModule({
  declarations: [
    ConfiguracionesComponent,
    ConfiguracionGlobalComponent,
    PasswordDialogComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionesRoutingModule,
    PrimeModule,
    FormsModule,
    SharedModule        
  ],
  exports: [
    PasswordDialogComponent
  ]
})
export class ConfiguracionesModule { }
