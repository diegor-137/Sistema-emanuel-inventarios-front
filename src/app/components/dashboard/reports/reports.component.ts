import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
    styleUrls: ['./reports-component.css'],
})
export class ReportsComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label:'Finanzas',
          icon:'pi pi-fw pi-inbox',
          items: [
            {
              label: 'Utilidad',
              icon:'pi pi-fw pi-pencil',
              routerLink: ''
            }
          ]          
      },
      {
          label:'Almacen',
          icon:'pi pi-fw pi-building',
          items:[
              {
                  label:'Productos',
                  icon:'pi pi-fw pi-th-large',  
                  routerLink: 'productos-report'                    
              },
                            {
                  label:'Inventario',
                  icon:'pi pi-fw pi-box',  
                  routerLink: 'inventario-report'                    
              },
          ]
      },

            {
          label:'Compras',
          icon:'pi pi-fw pi-table',
          items:[
              {
                  label:'Proveedor',
                  icon:'pi pi-fw pi-user-edit',  
                  routerLink: 'proveedor-report'                    
              },

              {
                  label:'Compras',
                  icon:'pi pi-fw pi-check-square',  
                  routerLink: 'compra-report'                    
              },
          ]
      },
  ];
  }

}
