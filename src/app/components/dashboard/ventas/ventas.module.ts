import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { SharedModule } from '../../shared/shared.module';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { VentaFormComponent } from './venta/venta-form/venta-form.component';
import { VentaListComponent } from './venta/venta-list/venta-list.component';
import { CotizacionComponent } from './venta/cotizacion/cotizacion.component';
import { ProductoComponent } from './producto/producto.component';
import { VistaComponent } from './venta/vista/vista.component';
import { PrimeModule } from '../../prime/prime.module';




@NgModule({
  declarations: [
    VentasComponent,
    ClienteFormComponent,
    ClienteListComponent,
    VentaFormComponent,
    VentaListComponent,
    CotizacionComponent,
    ProductoComponent,
    VistaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    VentasRoutingModule,
    PrimeModule,
  ]
})
export class VentasModule { }
