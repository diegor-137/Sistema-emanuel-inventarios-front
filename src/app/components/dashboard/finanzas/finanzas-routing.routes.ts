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

const routes: Routes = [
  {
    path: '', component: FinanzasComponent, children: [
      { path: '', component: CajaListComponent },
      { path: 'caja-config', component: CajaComponent },
      { path: 'caja-corte-list', component: CajaCorteListComponent },
      { path: 'caja-movimientos', component: MovimientosComponent },
      { path: 'cobro-list', component: CobroListComponent },
      { path: 'caja-gastos', component: GastosComponent },
      { path: 'caja-ingresos', component: IngresosComponent },
    ]
  },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanzasRoutingModule { }
