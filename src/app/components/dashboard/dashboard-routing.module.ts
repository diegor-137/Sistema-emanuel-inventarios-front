import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Role } from 'src/app/app.roles';
import { ValidarTokenGuard } from 'src/app/guards/validar-token.guard';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConfiguracionesModule } from './configuraciones/configuraciones.module';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', component: InicioComponent },
      {
        path: 'rr-hh', loadChildren: () => import('./recursos-humanos/recursos-humanos.module').then(x => x.RecursosHumanosModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.ADMIN] }
      },
      {
        path: 'almacen', loadChildren: () => import('./almacen/almacen.module').then(x => x.AlmacenModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.ADMIN, Role.COMPRAS] }
      },
      {
        path: 'compras', loadChildren: () => import('./compras/compras.module').then(x => x.ComprasModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.COMPRAS] }
      },
      {
        path: 'ventas', loadChildren: () => import('./ventas/ventas.module').then(x => x.VentasModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.ADMIN, Role.VENTAS, Role.CAJERO] }
      },
      {
        path: 'configuraciones', loadChildren: () => import('./configuraciones/configuraciones.module').then(x => x.ConfiguracionesModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.ADMIN] }
      },
      {
        path: 'finanzas', loadChildren: () => import('./finanzas/finanzas.module').then(x => x.FinanzasModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [`${Role.ADMIN}`,`${Role.CAJERO}`,`${Role.COMPRAS}`]}
      },
      {
        path: 'reportes', loadChildren: () => import('./reports/reports.module').then(x => x.ReportModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.ADMIN, Role.COMPRAS] }
      },
      {
        path: 'configuracion-system', loadChildren: () => import('./config-system/config-system.module').then(x => x.ConfigSystemModule),
        canActivate: [ValidarTokenGuard], canLoad: [ValidarTokenGuard],
        data: { userRoles: [Role.SUPERADMIN] }
      },
      
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
