import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraListComponent } from './compra/compra-list/compra-list.component';
import { ComprasComponent } from './compras.component';
import { CompraFormComponent } from './compra/compra-form/compra-form.component';
import { ProveedorListComponent } from './proveedor/proveedor-list/proveedor-list.component';
import { ProveedorFormComponent } from './proveedor/proveedor-form/proveedor-form.component';
import { InicioComprasComponent } from './inicio-compras/inicio-compras.component';

const routes: Routes = [
  {path:'',component:ComprasComponent,children:[
    {path:'compra', component:CompraListComponent},
    {path:'compra-form', component:CompraFormComponent},
    
    {path:'proveedor', component:ProveedorListComponent},
    {path:'proveedor-form', component:ProveedorFormComponent},
    
    {path:'', component:InicioComprasComponent},
    {path:'**', redirectTo:'', pathMatch:'full'},

]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
