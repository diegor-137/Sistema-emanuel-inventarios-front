import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html'
})
export class FinanzasComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
          label:'Caja',
          icon:'pi pi-fw pi-inbox',
          items: [
            {
              label: 'Configuracion',
              icon:'pi pi-fw pi-pencil',
              routerLink: 'caja-config'
            },
            {
              label: 'Movimientos',
              icon:'pi pi-fw pi-book',
              routerLink: 'caja-movimientos'
            },
            {
              label: 'Cortes',
              icon:'pi pi-fw pi-briefcase',
              routerLink: 'caja-corte-list'
            },
            {
              label: 'Cobros',
              icon:'pi pi-fw pi-money-bill',
              routerLink: 'cobro-list'
            },
            {
              label: 'Ingresos',
              icon:'pi pi-fw pi-angle-left',
              routerLink: 'caja-ingresos'
            },
            {
              label: 'Gastos',
              icon:'pi pi-fw pi-angle-right',
              routerLink: 'caja-gastos'
            },
            {
              label: 'Egresos',
              icon:'pi pi-fw pi-angle-double-right',
              routerLink: 'caja-egresos'
            }
          ]          
      },
      
  ];
  }

}
