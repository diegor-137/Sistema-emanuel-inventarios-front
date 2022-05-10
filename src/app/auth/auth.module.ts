import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.routes';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { NoAuthorizationComponent } from './no-authorization/no-authorization.component';
import { SharedModule } from '../components/shared/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    NoAuthorizationComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
