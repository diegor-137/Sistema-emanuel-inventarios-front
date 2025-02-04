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
import { InventarioListComponent } from './producto/inventario-list/inventario-list.component';
import { ProductoComponent } from '../ventas/producto/producto.component';
import { PrecioListComponent } from './precio/precio-list/precio-list.component';
import { TipoPrecioListComponent } from './precio/tipo-precio-list/tipo-precio-list.component';
import { TipoPrecioFormComponent } from './precio/tipo-precio-form/tipo-precio-form.component';
import { TrasladoComponent } from './traslado/traslado.component';
import { EnvioComponent } from './traslado/envio/envio.component';
import { TrasladosComponent } from './traslado/traslados/traslados.component';
import { TrasladosListsComponent } from './traslado/traslados-lists/traslados-lists.component';
import { RecepcionComponent } from './traslado/recepcion/recepcion.component';

const routes: Routes = [
  {path:'',component:AlmacenComponent,children:[
    {path:'',component:InicioalmacenComponent},

    
    {path:'marca',component:MarcaListComponent},
    {path:'marca-form',component:MarcaFormComponent},
    
    {path:'categoria',component:CategoriaListComponent},
    {path:'categoria-form',component:CategoriaFormComponent},

    {path:'producto',component:ProductoListComponent},
    {path:'producto-form',component:ProductoFormComponent},

    {path:'inventario-list',component:InventarioListComponent},

    {path:'productos',component:ProductoComponent},

    {path:'precio',component:PrecioListComponent},

    {path:'tipo-precio',component:TipoPrecioListComponent},

    {path:'traslado',component:TrasladoComponent, children:[
      {path:'traslados',component:TrasladosComponent},
      {path:'traslados-fecha',component:TrasladosListsComponent},
      {path:'envios',component:EnvioComponent},
      {path:'recepcion',component:RecepcionComponent}

    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }
