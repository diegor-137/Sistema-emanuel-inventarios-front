import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-config-system',
  templateUrl: './config-system.component.html',
})
export class ConfigSystemComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
          label:'Configuracion',
          icon:'pi pi-fw pi-cog',
          routerLink: 'global'

      },
            {
          label:'Region',
          icon:'pi pi-fw pi-building',
          items:[
              {
                  label:'Listado',
                  icon:'pi pi-fw pi-list',  
                  routerLink: 'listado-region'                    
              }
          ]
      },
      {
          label:'Sucursales',
          icon:'pi pi-fw pi-building',
          items:[
              {
                  label:'Listado',
                  icon:'pi pi-fw pi-list',  
                  routerLink: 'sucursales'                    
              }
          ]
      },
      {
        label:'Usuarios',
        icon:'pi pi-fw pi-user',
        items:[
            {
                label:'Listado',
                icon:'pi pi-fw pi-users',  
                routerLink: 'listado-usuarios'                    
            }
        ]
    },            
  ];
  }

}
