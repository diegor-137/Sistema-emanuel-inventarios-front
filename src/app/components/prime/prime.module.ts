import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    DividerModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    TableModule,
    SliderModule
  ]
})
export class PrimeModule { }
