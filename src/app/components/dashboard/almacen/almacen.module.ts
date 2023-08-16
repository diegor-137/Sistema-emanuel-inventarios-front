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
import { SharedModule } from '../../shared/shared.module';
import { InventarioListComponent } from './producto/inventario-list/inventario-list.component';
import { PrimeModule } from '../../prime/prime.module';
import { FormsModule } from '@angular/forms';
import { PrecioListComponent } from './precio/precio-list/precio-list.component';
import { TipoPrecioListComponent } from './precio/tipo-precio-list/tipo-precio-list.component';
import { TipoPrecioFormComponent } from './precio/tipo-precio-form/tipo-precio-form.component';
import { InventarioPorProductoComponent } from './producto/inventario-por-producto/inventario-por-producto.component';
import { TrasladoComponent } from './traslado/traslado.component';
import { EnvioComponent } from './traslado/envio/envio.component';
import { TrasladosComponent } from './traslado/traslados/traslados.component';
import { TrasladosFormComponent } from './traslado/traslados-form/traslados-form.component';
import { TrasladosListsComponent } from './traslado/traslados-lists/traslados-lists.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RecepcionComponent } from './traslado/recepcion/recepcion.component';

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
    InventarioListComponent,
    PrecioListComponent,
    TipoPrecioListComponent,
    TipoPrecioFormComponent,
    InventarioPorProductoComponent,
    TrasladoComponent,
    EnvioComponent,
    TrasladosComponent,
    TrasladosFormComponent,
    TrasladosListsComponent,
    RecepcionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlmacenRoutingModule,
    PrimeModule,
    FormsModule,
    PipesModule
  ]
})
export class AlmacenModule { }
