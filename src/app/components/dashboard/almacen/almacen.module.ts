import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlmacenRoutingModule } from './almacen-routing.module';
import { AlmacenComponent } from './almacen.component';
import { InicioalmacenComponent } from './inicioalmacen/inicioalmacen.component';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { MarcaListComponent } from './marca/marca-list/marca-list.component';
import { MarcaFormComponent } from './marca/marca-form/marca-form.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';



@NgModule({
  declarations: [
    AlmacenComponent,
    InicioalmacenComponent,
    CategoriaListComponent,
    CategoriaFormComponent,
    MarcaListComponent,
    MarcaFormComponent,
    ProductoFormComponent,
    ProductoListComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    AlmacenRoutingModule
  ]
})
export class AlmacenModule { }
