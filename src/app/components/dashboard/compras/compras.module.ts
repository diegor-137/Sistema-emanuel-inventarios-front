import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComprasRoutingModule } from './compras-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProveedorListComponent } from './proveedor/proveedor-list/proveedor-list.component';
import { ProveedorFormComponent } from './proveedor/proveedor-form/proveedor-form.component';
import { CompraFormComponent } from './compra/compra-form/compra-form.component';
import { CompraListComponent } from './compra/compra-list/compra-list.component';
import { InicioComprasComponent } from './inicio-compras/inicio-compras.component';
import { ProductoComponent } from './compra/producto/producto.component';
import { OrdenCompraComponent } from './compra/orden-compra/orden-compra.component';



@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorFormComponent,
    CompraFormComponent,
    CompraListComponent,
    InicioComprasComponent,
    ProductoComponent,
    OrdenCompraComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComprasRoutingModule,
    
  ],
  exports:[

  ]
})
export class ComprasModule { }
