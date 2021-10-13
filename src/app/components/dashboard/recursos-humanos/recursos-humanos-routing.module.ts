import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursosHumanosComponent } from './recursos-humanos.component';
import { IniciorhComponent } from './iniciorh/iniciorh.component';
import { DepartamentoComponent } from './departamento/departamento-list/departamento.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { PuestoListComponent } from './puesto/puesto-list/puesto-list.component';
import { PuestoFormComponent } from './puesto/puesto-form/puesto-form.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './empleado/empleado-form/empleado-form.component';


const routes: Routes = [  
  {path:'',component:RecursosHumanosComponent,children:[
    {path:'departamento', component:DepartamentoComponent},
    {path:'departamento-form', component:DepartamentoFormComponent},
    
    {path:'puesto', component:PuestoListComponent},
    {path:'puesto-form', component:PuestoFormComponent},
    
    {path:'empleado', component:EmpleadoListComponent},
    {path:'empleado-form', component:EmpleadoFormComponent},
    
    {path:'', component:IniciorhComponent},
    {path:'**', redirectTo:'', pathMatch:'full'},

]},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule { }
