import { Component, OnInit } from '@angular/core';
import { Envio, Traslado } from '../interfaces/traslado';
import { TrasladoService } from '../service/traslado.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TrasladosFormComponent } from '../traslados-form/traslados-form.component';
import { EnvioService } from '../service/envio.service';

@Component({
  selector: 'app-envio',
  templateUrl: './envio.component.html',
  styleUrls: ['./envio.component.css'],
  providers: [DialogService]
})
export class EnvioComponent implements OnInit {

  traslados:Traslado[] = []
  loading: boolean;
  displayModal: boolean = false;
  envios!:Envio[]
  loadingEnvios!: boolean;


  envioId!:number
  constructor(public envioService:EnvioService, public dialogService: DialogService, public trasladoService:TrasladoService) {
    this.loading = true;

   }

  ngOnInit(): void {
    this.onClose()
    this.envioService.initializeFormGetBuilder()
  }

  findAllTrasladosNoEnvio(){
    this.envioService.findAllTrasladosNoEnvio().subscribe(data=>{
      this.traslados = data
      this.loading = false;
    })
  }

  findAllEnvios(){
    this.loadingEnvios = true;
    this.envioService.envios().subscribe(data=>{
      this.envios= data
      this.loadingEnvios = false;
    })
  }

  verTraslado(traslado:Traslado, transactions:boolean){
    this.envioService.initializeFormBuilder();
    this.trasladoService.llenarFormulario(traslado);
    console.log(this.trasladoService.form.value);
    
    const ref =this.dialogService.open(TrasladosFormComponent, {
      data:{transactions, envio:true, res:true},
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
    this.findAllTrasladosNoEnvio();
  }

  ultimos5Sucursal(){
    this.loadingEnvios = true;
    this.envioService.ultimos5Sucursal().subscribe(data=>{      
      this.envios = data
      this.loadingEnvios = false;
    })
  }

  hoySucursal(){
    this.loadingEnvios = true;
    this.envioService.hoySucursal().subscribe(data=>{      
      this.envios = data
      this.loadingEnvios = false;
    })
  }

  buscarEnvio(){
    this.loadingEnvios = true;
    this.envios = []
    this.envioService.buscarEnvio(this.envioId).subscribe(data=>{
      data?this.envios.push(data):null
      this.loadingEnvios = false;
    })
  }
}
