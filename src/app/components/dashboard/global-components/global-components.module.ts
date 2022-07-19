import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { PrimeModule } from '../../prime/prime.module';
import { SharedModule } from '../../shared/shared.module';
import { PasswordDialogComponent } from './password-dialog/password-dialog.component';

@NgModule({
  declarations: [
    PasswordDialogComponent
  ],
  imports: [
    CommonModule,
    PrimeModule,
    FormsModule,
    SharedModule        
  ],
  exports: [
    PasswordDialogComponent
  ]
})
export class GlobalComponentsModule { }
