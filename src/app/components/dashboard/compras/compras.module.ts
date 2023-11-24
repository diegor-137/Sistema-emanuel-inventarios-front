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
import { InventarioPorProductoComponent } from './compra/inventario-por-producto/inventario-por-producto.component';
import { FormsModule } from '@angular/forms';
import { CuentaPorPagarComponent } from './creditos/cuenta-por-pagar/cuenta-por-pagar.component';
import { CuentasPorPagarFormComponent } from './creditos/cuentas-por-pagar-form/cuentas-por-pagar-form.component';
import { CompraContadoFormComponent } from './compra/compra-contado-form/compra-contado-form.component';
import { PagoFormComponent } from './pago-form/pago-form.component';



@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorFormComponent,
    CompraFormComponent,
    CompraListComponent,
    InicioComprasComponent,
    ProductoComponent,
    OrdenCompraComponent,
    InventarioPorProductoComponent,
    CuentaPorPagarComponent,
    CuentasPorPagarFormComponent,
    CompraContadoFormComponent,
    PagoFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComprasRoutingModule,
    PrimeModule,
    FormsModule
    
  ],
  exports:[

  ]
})
export class ComprasModule { }
