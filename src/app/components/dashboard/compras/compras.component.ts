import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html'
})
export class ComprasComponent implements OnInit {

    items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
        this.items = [
      {
        label:'Compras',
        icon:'pi pi-fw pi-download',
        routerLink: 'compra'      
      },
      {
        label:'Orden de Compra',
        icon:'pi pi-fw pi-book',
        routerLink: 'orden-compra'      
      },
      {
        label:'Nueva Compra',
        icon:'pi pi-fw pi-shopping-cart',
        routerLink: 'compra-form'      
      },
      {
        label:'Proveedores',
        icon:'pi pi-fw pi-user-minus',
        routerLink: 'proveedor'      
      },
            {
        label:'Cuentas por pagar',
        icon:'pi pi-fw pi-list',
        routerLink: 'cuenta-por-pagar'      
      },
    ]
  }

}
