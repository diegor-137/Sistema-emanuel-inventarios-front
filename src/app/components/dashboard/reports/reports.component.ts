import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html'
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
      
  ];
  }

}
