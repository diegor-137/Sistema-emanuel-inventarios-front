import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { IniciorhComponent } from './recursos-humanos/iniciorh/iniciorh.component';
import { DepartamentoComponent } from './recursos-humanos/departamento/departamento.component';
import { DepartamentoFormComponent } from './recursos-humanos/departamento/form//departamento-form/departamento-form.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'',component:InicioComponent},
    
    {path:'recursos-inicio', component:IniciorhComponent},
    {path:'departamento', component:DepartamentoComponent},
    {path:'departamento-form', component:DepartamentoFormComponent},
    
    
  ]},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
