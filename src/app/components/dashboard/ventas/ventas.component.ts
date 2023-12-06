import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Role } from 'src/app/app.roles';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls:['./ventas-component.css']
})
export class VentasComponent implements OnInit {

  items!: MenuItem[];

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService) { }

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
        routerLink: 'cuentas-por-cobrar',
        visible: this.usuario.role?.some(r =>[`${Role.PENDIENTE}`].includes(r))      
      },
    ]
  }

}
