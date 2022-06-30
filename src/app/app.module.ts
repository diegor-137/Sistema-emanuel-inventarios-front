import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './components/shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadoFormComponent } from './components/dashboard/recursos-humanos/empleado/empleado-form/empleado-form.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { registerLocaleData } from '@angular/common';

import localePy from '@angular/common/locales/es-PY';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
registerLocaleData(localePy, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),

    MatDialogModule,
  ],
  providers: [     {
    provide: MatDialogRef,
    useValue: {}
  },
  {provide: LOCALE_ID, useValue: 'es'},
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ConfirmationService, 
  MessageService
],
  bootstrap: [AppComponent],
  entryComponents:[EmpleadoFormComponent]
})
export class AppModule { }
