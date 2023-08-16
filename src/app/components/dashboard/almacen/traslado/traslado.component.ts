import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-traslado',
  templateUrl: './traslado.component.html',
  styleUrls: ['./traslado.component.css']
})
export class TrasladoComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Traslados',
        icon:'pi pi-fw pi-box',
        items:[
          {
              label:'Sucursales',
              icon:'pi pi-fw pi-list',  
              routerLink: 'traslados'                    
          },
          {
            label:'Mis traslados',
            icon:'pi pi-fw pi-list',  
            routerLink: 'traslados-fecha'                    
        }
        ]
      },
      {
        label:'Envios',
        icon:'pi pi-fw pi-send',
        items:[
          {
            label:'Enviar traslado',
              icon:'pi pi-fw pi-list',  
              routerLink: 'envios'
          },
          {
            label:'Recepcion',
              icon:'pi pi-arrow-down-left',  
              routerLink: 'recepcion'
          }
        ]
      }
  ];
  }

}
