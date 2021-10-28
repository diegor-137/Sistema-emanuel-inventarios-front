import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';


const routes: Routes = [
  
  
  {path:'',component:DashboardComponent,children:[
    {path:'',component:InicioComponent},
    {path:'rr-hh', loadChildren:()=>import('./recursos-humanos/recursos-humanos.module').then(x => x.RecursosHumanosModule)},
    {path:'almacen', loadChildren:()=>import('./almacen/almacen.module').then(x => x.AlmacenModule)},
    {path:'compras', loadChildren:()=>import('./compras/compras.module').then(x => x.ComprasModule)},
    {path:'**', redirectTo:'', pathMatch:'full'},
  ]},
];

 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
