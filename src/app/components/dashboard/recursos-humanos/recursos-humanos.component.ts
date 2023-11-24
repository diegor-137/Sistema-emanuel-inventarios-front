import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
})
export class RecursosHumanosComponent implements OnInit {

  items!: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label:'Empleados',
        icon:'pi pi-fw pi-user',
        routerLink: 'empleado'      
      },
      {
        label:'Puesto',
        icon:'pi pi-fw pi-briefcase',
        routerLink: 'puesto'      
      },
      {
        label:'Departamento',
        icon:'pi pi-fw pi-building',
        routerLink: 'departamento',
      },
    ]
  }

}
