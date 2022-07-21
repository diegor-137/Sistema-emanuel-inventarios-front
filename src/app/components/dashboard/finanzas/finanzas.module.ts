import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CajaListComponent } from './caja/caja-list/caja-list.component';
import { FinanzasComponent } from './finanzas.component';
import { FinanzasRoutingModule } from './finanzas-routing.routes';
import { SharedModule } from '../../shared/shared.module';
import { PrimeModule } from '../../prime/prime.module';
import { CajaCobroComponent } from './caja/caja-list/caja-cobro/caja-cobro.component';
import { FormsModule } from '@angular/forms';
import { CajaComponent } from './caja/caja/caja.component';
import { CajaCobroListComponent } from './caja/caja-list/caja-cobro-list/caja-cobro-list.component';
import { CajaCorteComponent } from './caja/caja-list/caja-corte/caja-corte.component';
import { CajaCorteListComponent } from './caja/caja-corte-list/caja-corte-list.component';
import { DetalleCorteComponent } from './caja/caja-corte-list/detalle-corte/detalle-corte.component';
import { MovimientosComponent } from './caja/movimientos/movimientos.component';
import { CobroListComponent } from './caja/cobros-list/cobro-list.component';
import { DetalleCobroComponent } from './caja/cobros-list/detalle-cobro/detalle-cobro.component';
import { GastosComponent } from './caja/gastos/gastos.component';
import { DialogService } from 'primeng/dynamicdialog';
import { IngresosComponent } from './caja/ingresos/ingresos.component';

@NgModule({
  declarations: [
    CajaListComponent,
    FinanzasComponent,
    CajaCobroComponent,
    CajaComponent,
    CajaCobroListComponent,
    CajaCorteComponent,
    CajaCorteListComponent,
    DetalleCorteComponent,
    MovimientosComponent,
    CobroListComponent,
    DetalleCobroComponent,
    GastosComponent,
    IngresosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FinanzasRoutingModule,
    PrimeModule,
    FormsModule
  ],
  providers: [DialogService]
})
export class FinanzasModule { }
