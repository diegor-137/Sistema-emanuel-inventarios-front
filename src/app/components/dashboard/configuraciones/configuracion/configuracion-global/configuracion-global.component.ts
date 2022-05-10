import { Component} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfiguracionGlobalService } from '../services/configuracion-global.service';

@Component({
  selector: 'app-configuracion-global',
  templateUrl: './configuracion-global.component.html',
  styleUrls: ['./configuracion-global.component.css'],
  providers: [MessageService]
})
export class ConfiguracionGlobalComponent {

  permisos!: any[];
  carga = false;


  constructor(private readonly service: ConfiguracionGlobalService, private messageService: MessageService) {
    this.service.getConfig().subscribe(data => {
      this.permisos = data
    });
    this.carga = true
  }

  getCheckboxes() {
    const list = this.permisos/* .filter(x => x.checked === true) */
    this.service.savePermisos(list).subscribe(() => {
      this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Los permisos se han actualizado!' })
    });
  }
}
