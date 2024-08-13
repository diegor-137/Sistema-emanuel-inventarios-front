import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CajaListComponent } from './caja/caja-list/caja-list.component';
import { FinanzasComponent } from './finanzas.component';
import { CajaComponent } from './caja/caja/caja.component';
import { CajaCorteListComponent } from './caja/caja-corte-list/caja-corte-list.component';
import { MovimientosComponent } from './caja/movimientos/movimientos.component';
import { CobroListComponent } from './caja/cobros-list/cobro-list.component';
import { GastosComponent } from './caja/gastos/gastos.component';
import { IngresosComponent } from './caja/ingresos/ingresos.component';
import { EgresosComponent } from './caja/egresos/egresos.component';
import { ValidarCajaGuard } from 'src/app/guards/validar-caja.guard';
import { CuentaBancariaComponent } from './fondos/cuenta-bancaria/cuenta-bancaria.component';
import { CuentaBancariaListComponent } from './fondos/cuenta-bancaria-list/cuenta-bancaria-list.component';
import { EfectivoComponent } from './efectivo/efectivo/efectivo.component';
import { EfectivoListComponent } from './efectivo/efectivo-list/efectivo-list.component';
import { TipoGastoComponent } from './caja/tipo-gasto/tipo-gasto.component';
import { CuentasPorCobrarComponent } from '../ventas/creditos/cuentas-por-cobrar/cuentas-por-cobrar.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  {
    path: '', component: FinanzasComponent, children: [
      { path: '', component: CajaListComponent, canActivate: [ValidarCajaGuard], canLoad: [ValidarCajaGuard]},
      { path: 'caja-config', component: CajaComponent },
      { path: 'caja-corte-list', component: CajaCorteListComponent },
      { path: 'caja-movimientos', component: MovimientosComponent },
      { path: 'cobro-list', component: CobroListComponent },
      { path: 'pago-list', component: PagoComponent },
      { path: 'caja-tipo-gasto', component: TipoGastoComponent},
      { path: 'caja-gastos', component: GastosComponent},
      { path: 'caja-ingresos', component: IngresosComponent, canActivate: [ValidarCajaGuard], canLoad: [ValidarCajaGuard] },
      { path: 'caja-egresos', component: EgresosComponent, canActivate: [ValidarCajaGuard], canLoad: [ValidarCajaGuard] },
      { path: 'fondos-banco', component: CuentaBancariaComponent },
      { path: 'fondos-banco-list/:id', component: CuentaBancariaListComponent },
      { path: 'efectivo', component: EfectivoComponent },
      { path: 'efectivo-list/:id', component: EfectivoListComponent },
      { path: 'cuentas-por-cobrar', component:CuentasPorCobrarComponent},
    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasRoutingModule { }
