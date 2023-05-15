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
import { PrimeModule } from '../../prime/prime.module';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { CuentaPorPagarComponent } from './creditos/cuenta-por-pagar/cuenta-por-pagar.component';

=======
>>>>>>> a1da166b3c8bcbb92928b11ea83b5f3999100fee



@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorFormComponent,
    CompraFormComponent,
    CompraListComponent,
    InicioComprasComponent,
    ProductoComponent,
    OrdenCompraComponent,
    CuentaPorPagarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComprasRoutingModule,
    PrimeModule,
<<<<<<< HEAD
    FormsModule
=======
    
>>>>>>> a1da166b3c8bcbb92928b11ea83b5f3999100fee
  ],
  exports:[

  ]
})
export class ComprasModule { }
