import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraListComponent } from './compra/compra-list/compra-list.component';
import { ComprasComponent } from './compras.component';
import { CompraFormComponent } from './compra/compra-form/compra-form.component';
import { ProveedorListComponent } from './proveedor/proveedor-list/proveedor-list.component';
import { ProveedorFormComponent } from './proveedor/proveedor-form/proveedor-form.component';
import { InicioComprasComponent } from './inicio-compras/inicio-compras.component';
import { OrdenCompraComponent } from './compra/orden-compra/orden-compra.component';
import { CuentaPorPagarComponent } from './creditos/cuenta-por-pagar/cuenta-por-pagar.component';

const routes: Routes = [
  {path:'',component:ComprasComponent,children:[
    {path:'compra', component:CompraListComponent},
    {path:'compra-form', component:CompraFormComponent},
    
    {path:'orden-compra', component:OrdenCompraComponent},

    {path:'proveedor', component:ProveedorListComponent},
    {path:'proveedor-form', component:ProveedorFormComponent},
    {path: 'cuenta-por-pagar', component: CuentaPorPagarComponent},
    {path:'', component:InicioComprasComponent},
    {path:'**', redirectTo:'', pathMatch:'full'},

]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
