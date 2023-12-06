import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Role } from 'src/app/app.roles';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
})
export class AlmacenComponent implements OnInit {


  items!: MenuItem[];
  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService) { }

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
      ],
      visible: this.usuario.role?.some(r =>[`${Role.COMPRAS}`].includes(r))           
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
      ],
      visible: this.usuario.role?.some(r =>[`${Role.COMPRAS}`].includes(r))      
      },
      {
        label: 'Existencia',
        icon:'pi pi-fw pi-box',
        routerLink: './',
        visible: this.usuario.role?.some(r =>[`${Role.ADMIN}`].includes(r))
      },
      {
          label: 'Inventario',
          icon:'pi pi-fw pi-box',
          routerLink: 'inventario-list',
          visible: this.usuario.role?.some(r =>[`${Role.COMPRAS}`].includes(r))
      },
      {
          label: 'Traslados',
          icon:'pi pi-fw pi-car',
          items:[
            {
                label:'Sucursales',
                icon:'pi pi-fw pi-list',  
                routerLink: 'traslado/traslados'                    
            },
            {
              label:'Mis traslados',
              icon:'pi pi-fw pi-list',  
              routerLink: 'traslado/traslados-fecha'                    
            }
          ],
          visible: this.usuario.role?.some(r =>[`${Role.BODEGUERO}`, `${Role.ADMIN}` ,`${Role.COMPRAS}`].includes(r))
      },
      {
        label: 'Envios',
        icon:'pi pi-fw pi-send',
        items:[
          {
            label:'Enviar traslado',
              icon:'pi pi-fw pi-list',  
              routerLink: 'traslado/envios'
          },
          {
            label:'Recepcion',
              icon:'pi pi-arrow-down-left',  
              routerLink: 'traslado/recepcion'
          }
        ],
        visible: this.usuario.role?.some(r =>[`${Role.BODEGUERO}`, `${Role.ADMIN}` ,`${Role.COMPRAS}`].includes(r))
      },

  ]
    
  }
}
