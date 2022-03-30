import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { CotizacionComponent } from './venta/cotizacion/cotizacion.component';
import { VentaFormComponent } from './venta/venta-form/venta-form.component';
import { VentaListComponent } from './venta/venta-list/venta-list.component';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  {path:'',component:VentasComponent,children:[
    {path:'venta', component:VentaListComponent},
    {path:'venta-form', component:VentaFormComponent},
    
    {path:'cotizacion', component:CotizacionComponent},

    {path:'cliente', component:ClienteListComponent},
    {path:'cliente-form', component:ClienteFormComponent},
    
    //{path:'', component:InicioComprasComponent},
    {path:'**', redirectTo:'', pathMatch:'full'},

]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
