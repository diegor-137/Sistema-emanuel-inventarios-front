import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfiguracionGlobalService } from '../services/configuracion-global.service';

@Component({
  selector: 'app-config-ventas',
  templateUrl: './config-ventas.component.html',
  styleUrls: ['./config-ventas.component.css'],
  providers: [MessageService]
})
export class ConfigVentasComponent implements OnInit {

  checked!:boolean

  constructor(public readonly service: ConfiguracionGlobalService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  guardar(){
    this.service.guardar().subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Guardado', detail: 'Se han guardado los cambios'});
    })
  }

}
