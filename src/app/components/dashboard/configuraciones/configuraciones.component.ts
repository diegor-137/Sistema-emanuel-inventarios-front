import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { UsuarioService } from './usuarios/services/usuario.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html'
})
export class ConfiguracionesComponent implements OnInit {

    constructor(public usuarioService:UsuarioService){}

  items!: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label:'Configuracion',
                icon:'pi pi-fw pi-cog',
                routerLink: 'config'

            },
            {
                label:'Usuarios',
                icon:'pi pi-fw pi-user',
                items:[
                    {
                        label:'Nuevo',
                        icon:'pi pi-fw pi-user-plus',
                        routerLink: 'usuarios'

                    },
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
