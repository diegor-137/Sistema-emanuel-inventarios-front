import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls:['./ventas-component.css']
})
export class VentasComponent implements OnInit {

    items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Ventas',
        icon:'pi pi-fw pi-shopping-bag',
        routerLink: 'venta'      
      },
      {
        label:'Cotizaciones',
        icon:'pi pi-fw pi-send',
        routerLink: 'cotizacion'      
      },
      {
        label:'Nueva Venta',
        icon:'pi pi-fw pi-shopping-cart',
        routerLink: 'venta-form'      
      },
      {
        label:'Clientes',
        icon:'pi pi-fw pi-user-minus',
        routerLink: 'cliente'      
      },
            {
        label:'Cuentas por cobrar',
        icon:'pi pi-fw pi-list',
        routerLink: 'cuentas-por-cobrar'      
      },
    ]
  }

}
