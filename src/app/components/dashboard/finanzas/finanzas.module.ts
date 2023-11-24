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
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IngresosComponent } from './caja/ingresos/ingresos.component';
import { EgresosComponent } from './caja/egresos/egresos.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CuentaBancariaComponent } from './fondos/cuenta-bancaria/cuenta-bancaria.component';
import { CuentaBancariaFormComponent } from './fondos/cuenta-bancaria-form/cuenta-bancaria-form.component';
import { CuentaBancariaListComponent } from './fondos/cuenta-bancaria-list/cuenta-bancaria-list.component';
import { TransaccionCuentaFormComponent } from './fondos/transaccion-cuenta-form/transaccion-cuenta-form.component';
import { EfectivoComponent } from './efectivo/efectivo/efectivo.component';
import { EfectivoFormComponent } from './efectivo/efectivo-form/efectivo-form.component';
import { EfectivoListComponent } from './efectivo/efectivo-list/efectivo-list.component';
import { TransaccionEfectivoFormComponent } from './efectivo/transaccion-efectivo-form/transaccion-efectivo-form.component';
import { TipoGastoComponent } from './caja/tipo-gasto/tipo-gasto.component';
import { TipoGastoFormComponent } from './caja/tipo-gasto/tipo-gasto-form/tipo-gasto-form.component';
import { GastoFormComponent } from './caja/gastos/gasto-form/gasto-form.component';

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
    IngresosComponent,
    EgresosComponent,
    CuentaBancariaComponent,
    CuentaBancariaFormComponent,
    CuentaBancariaListComponent,
    TransaccionCuentaFormComponent,
    EfectivoComponent,
    EfectivoFormComponent,
    EfectivoListComponent,
    TransaccionEfectivoFormComponent,
    TipoGastoComponent,
    TipoGastoFormComponent,
    GastoFormComponent  
  ],
  imports: [
    CommonModule,
    SharedModule,
    FinanzasRoutingModule,
    PrimeModule,
    FormsModule,
    PipesModule
  ],
  providers: [DialogService, DynamicDialogConfig]
})
export class FinanzasModule { }
