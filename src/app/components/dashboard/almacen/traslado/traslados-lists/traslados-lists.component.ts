import { Component, OnInit } from '@angular/core';
import { Traslado } from '../interfaces/traslado';
import { TrasladoService } from '../service/traslado.service';
import { DialogService } from 'primeng/dynamicdialog';
import { TrasladosFormComponent } from '../traslados-form/traslados-form.component';

@Component({
  selector: 'app-traslados-lists',
  templateUrl: './traslados-lists.component.html',
  styleUrls: ['./traslados-lists.component.css'],
  providers: [DialogService]
})
export class TrasladosListsComponent implements OnInit {

  traslados:Traslado[] = []
  trasladosLocal:Traslado[] = []
  loading!: boolean;
  loadingLocal!: boolean;

  trasladoId!:number
  constructor(
    public trasladoService:TrasladoService,
    public dialogService: DialogService) {}

  ngOnInit(): void {
    this.getTrasladosLocal()
  }

  nuevoTraslado(){
    this.trasladoService.resetFormBuilder()
    this.trasladoService.initializeFormBuilder();
    const ref =this.dialogService.open(TrasladosFormComponent, {
      data:{transactions:false},
      header: 'Traslado detalle',
      width: '80%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })

    ref.onClose.subscribe(()=>{
      this.onClose();
    })
  }

  getTrasladosPorfechaLocal(){
    this.loadingLocal = true;
    this.trasladoService.getTrasladosPorfechaLocal().subscribe(data=>{
      this.trasladosLocal = data
      this.loadingLocal = false;
    })
  }


    getTrasladosLocal(){
    this.trasladoService.getTrasladosLocal().subscribe(data=>{
      this.traslados = data
      this.loading = false;
    })
  }

  verTraslado(traslado:Traslado, transactions:boolean, res:boolean){
    this.trasladoService.llenarFormulario(traslado);
    const ref =this.dialogService.open(TrasladosFormComponent, {
      data:{transactions, res},
      header: 'Traslado detalle',
      width: '80%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })
  }

  eliminarTraslado(traslado:Traslado){}

  onClose(){
    this.getTrasladosLocal()
  }

  ultimosCincoLocal(){
    this.loadingLocal = true;
    this.trasladoService.ultimosCincoLocal().subscribe(data=>{      
      this.trasladosLocal = data
      this.loadingLocal = false;
    })
  }

  hoyLocal(){
    this.loadingLocal = true;
    this.trasladoService.hoyLocal().subscribe(data=>{      
      this.trasladosLocal = data
      this.loadingLocal = false;
    })
  }

  buscarTrasladoLocal(){
    this.trasladosLocal = []
    this.trasladoService.buscarTrasladoLocal(this.trasladoId).subscribe(data=>{
      data?this.trasladosLocal.push(data):null
    })
  }

}
