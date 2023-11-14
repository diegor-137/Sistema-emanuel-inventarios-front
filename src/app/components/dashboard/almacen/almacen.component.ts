import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
})
export class AlmacenComponent implements OnInit {


  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    
    this.items = [      
      {
      label:'Productos',
      icon:'pi pi-fw pi-inbox',
      items: [
          {
              label: 'Listado Producto',
              icon:'pi pi-fw pi-book',
              routerLink: 'producto'
          },
          {
              label:'Marcas',
              icon:'pi pi-fw pi-pencil',
              routerLink: 'marca'      
          },
          {
              label:'Categorias',
              icon:'pi pi-fw pi-bolt',
              routerLink: 'categoria'      
          },
      ]      
      },

      {
      label:'Precios',
      icon:'pi pi-fw pi-dollar',
      items: [
          {
              label: 'Precios',
              icon:'pi pi-fw pi-dollar',
              routerLink: 'precio'
          },
          {
              label:'Tipo Precios',
              icon:'pi pi-fw pi-exclamation-circle',
              routerLink: 'tipo-precio'      
          },
      ]      
      },
      {
          label: 'Inventario',
          icon:'pi pi-fw pi-box',
          routerLink: 'inventario-list'
      },
      {
          label: 'Traslados',
          icon:'pi pi-fw pi-car',
          routerLink: 'traslado/traslados'
      },

  ]
    
  }
}
