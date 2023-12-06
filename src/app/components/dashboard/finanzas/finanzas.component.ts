import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Role } from 'src/app/app.roles';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html'
})
export class FinanzasComponent implements OnInit {

  items!: MenuItem[];
  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Registros caja',
        icon:'pi pi-fw pi-inbox',
        items: [
          {
            label: 'Ingresos',
            icon:'pi pi-fw pi-angle-left',
            routerLink: 'caja-ingresos'
          },  
          {
            label: 'Egresos',
            icon:'pi pi-fw pi-angle-double-right',
            routerLink: 'caja-egresos'
          },
          {
            label: 'Creditos',
            icon:'pi pi-fw pi-angle-right',
            routerLink: 'cuentas-por-cobrar',
            visible:this.usuario.role?.some(r =>[`${Role.CAJERO}`].includes(r))
          },
          {
            label: 'Movimientos',
            icon:'pi pi-fw pi-book',
            routerLink: 'caja-movimientos',
            visible:this.usuario.role?.some(r =>[`${Role.ADMIN}`].includes(r))
          },
          {
            label: 'Cortes',
            icon:'pi pi-fw pi-briefcase',
            routerLink: 'caja-corte-list',
            visible:this.usuario.role?.some(r =>[`${Role.ADMIN}`].includes(r))
          },
          {
            label: 'Cobros',
            icon:'pi pi-fw pi-money-bill',
            routerLink: 'cobro-list',
            visible:this.usuario.role?.some(r =>[`${Role.ADMIN}`].includes(r))
          },
        ],
        visible:this.usuario.role?.some(r =>[`${Role.CAJERO}`,`${Role.ADMIN}`].includes(r))
      },
      {
          label:'Fondos',
          icon:'pi pi-fw pi-money-bill',
          items: [
            {
              label: 'Cuenta Bancaria',
              icon: 'pi pi-fw pi-building',
              routerLink: 'fondos-banco',
              visible: this.usuario.role?.some(r =>[`${Role.COMPRAS}`].includes(r))
            },
            {
              label: 'Efectivo',
              icon: 'pi pi-fw pi-money-bill',
              routerLink: 'efectivo'
            }
          ],
          visible: this.usuario.role?.some(r =>[`${Role.ADMIN}`,`${Role.COMPRAS}`].includes(r))
      },
      {
        label:'Finanzas',
        icon:'pi pi-fw pi-inbox',
        items: [
          {
            label: 'Configuracion',
            icon:'pi pi-fw pi-pencil',
            routerLink: 'caja-config'
          },
          {
            label: 'Gastos',
            icon:'pi pi-fw pi-angle-right',
            routerLink: 'caja-gastos'
          },
          {
            label: 'Tipo Gastos',
            icon:'pi pi-fw pi-angle-right',
            routerLink: 'caja-tipo-gasto'
          },
          
        ], 
        visible: this.usuario.role?.some(r =>[`${Role.ADMIN}`].includes(r))         
      },
      {
        label: 'Caja',
        icon:'pi pi-fw pi-money-bill',
        routerLink: './',
        visible:this.usuario.role?.some(r =>[`${Role.CAJERO}`].includes(r))
      },
      
  ];
  }

}
