import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Role } from 'src/app/app.roles';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
    styleUrls: ['./reports-component.css'],
})
export class ReportsComponent implements OnInit {

    
  items!: MenuItem[];
  get usuario() {
    return this.authService.usuario;
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.items = [
      {
          label:'Finanzas',
          icon:'pi pi-fw pi-inbox',
          items: [
            {
              label: 'Utilidad',
              icon:'pi pi-fw pi-pencil',
              routerLink: './'
            }
          ],
          visible: this.usuario.role?.some(r =>[`${Role.ADMIN}`].includes(r))          
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
          ],
          visible: this.usuario.role?.some(r =>[`${Role.COMPRAS}`].includes(r)) 
      },
                  {
          label:'Ventas',
          icon:'pi pi-fw pi-slack',
          items:[
              {
                  label:'Clientes',
                  icon:'pi pi-fw pi-user-edit',  
                  routerLink: 'cliente-report'                    
              },

              {
                  label:'Ventas',
                  icon:'pi pi-fw pi-shopping-bag',  
                  routerLink: 'venta-report'                    
              },
          ],
      },
  ];
  }

}
