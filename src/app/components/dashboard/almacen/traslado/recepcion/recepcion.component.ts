import { Component, OnInit } from '@angular/core';
import { Envio, Traslado } from '../interfaces/traslado';
import { EnvioService } from '../service/envio.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TrasladoService } from '../service/traslado.service';
import { TrasladosFormComponent } from '../traslados-form/traslados-form.component';

@Component({
  selector: 'app-recepcion',
  templateUrl: './recepcion.component.html',
  styleUrls: ['./recepcion.component.css'],
  providers: [DialogService]
})
export class RecepcionComponent implements OnInit {

  /* traslados:Traslado[] = [] */
  displayModal: boolean = false;
  loadingEnvios: boolean;
  envios:Envio[]=[]
  enviosFinalizados:Envio[]=[]
  loadingEnviosFinalizados!: boolean;

  envioId!:number
  constructor(public envioService:EnvioService, public dialogService: DialogService, public trasladoService:TrasladoService) {
    this.loadingEnvios = true;
   }

  ngOnInit(): void {
    this.onClose()
  }

  findAllEnviosNoRecepcion(){
    this.envioService.enviosNoRecepcion().subscribe(data=>{
      this.envios= data
      this.loadingEnvios = false;
    })
  }

  findAllEnviosRecepcion(){
    this.loadingEnviosFinalizados = true
    this.envioService.findAllEnviosRecepcion().subscribe(data=>{
      this.enviosFinalizados = data
      this.loadingEnviosFinalizados = false
    })

  }

  verTraslado(envio:Envio, transactions:boolean){
    this.envioService.initializeFormBuilder();
    this.envioService.llenarFormulario(envio)
    this.trasladoService.buscarTrasladoLocal(envio.traslado.id).subscribe(data=>{
      this.trasladoService.llenarFormulario(data);
    })
    const ref =this.dialogService.open(TrasladosFormComponent, {
      data:{transactions, recepcion:true, envio:true},
      header: 'Traslado detalle',
      width: '80%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })

    ref.onClose.subscribe(()=>{
      this.onClose();
    })
  }

  showModalDetail(envio:Envio){
    this.envioService.initializeFormBuilder()
    this.envioService.llenarFormulario(envio)
    this.displayModal = true;
  }

  onClose(){
    this.findAllEnviosNoRecepcion();
  }

  ultimos5Local(){
    this.loadingEnviosFinalizados = true;
    this.envioService.ultimos5Local().subscribe(data=>{      
      this.enviosFinalizados = data
      this.loadingEnviosFinalizados = false;
    })
  }

  hoyLocal(){
    this.loadingEnviosFinalizados = true;
    this.envioService.hoyLocal().subscribe(data=>{      
      this.enviosFinalizados = data
      this.loadingEnviosFinalizados = false;
    })
  }

  buscarEnvioRecepcion(){
    this.loadingEnviosFinalizados = true;
    this.enviosFinalizados = []
    this.envioService.buscarEnvioRecepcion(this.envioId).subscribe(data=>{
      data?this.enviosFinalizados.push(data):null
      this.loadingEnviosFinalizados = false;
    })
  }

}
