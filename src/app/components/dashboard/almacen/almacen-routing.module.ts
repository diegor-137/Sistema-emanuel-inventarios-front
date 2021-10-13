import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './almacen.component';
import { MarcaListComponent } from './marca/marca-list/marca-list.component';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { InicioalmacenComponent } from './inicioalmacen/inicioalmacen.component';
import { MarcaFormComponent } from './marca/marca-form/marca-form.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ProductoFormComponent } from './producto/producto-form/producto-form.component';

const routes: Routes = [
  {path:'',component:AlmacenComponent,children:[
    {path:'',component:InicioalmacenComponent},

    {path:'marca',component:MarcaListComponent},
    {path:'marca-form',component:MarcaFormComponent},
    
    {path:'categoria',component:CategoriaListComponent},
    {path:'categoria-form',component:CategoriaFormComponent},

    {path:'producto',component:ProductoListComponent},
    {path:'producto-form',component:ProductoFormComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
