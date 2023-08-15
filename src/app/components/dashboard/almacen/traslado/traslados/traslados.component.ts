import { Component, OnInit } from '@angular/core';
import { TrasladoService } from '../service/traslado.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Traslado } from '../interfaces/traslado';
import { DialogService } from 'primeng/dynamicdialog';
import { TrasladosFormComponent } from '../traslados-form/traslados-form.component';

@Component({
  selector: 'app-traslados',
  templateUrl: './traslados.component.html',
  styleUrls: ['./traslados.component.css'],
  providers: [DialogService]
})
export class TrasladosComponent implements OnInit {

  traslados:Traslado[] = []
  trasladosLocalPorFecha:Traslado[] = []

  loading: boolean;
  loadingLocal!: boolean;

  trasladoId!:number
  constructor(
    public trasladoService:TrasladoService,
    public dialogService: DialogService
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.getTraslados()
    this.trasladoService.initializeFormGetBuilder()
  }

  getTraslados(){
    this.trasladoService.getTraslados().subscribe(data=>{
      this.traslados = data
      this.loading = false;
    })
  }


  getTrasladosPorfechaSucusal(){
    this.loadingLocal = true;
    this.trasladoService.getTrasladosPorfechaSucusal().subscribe(data=>{
      console.log(data);
      
      this.trasladosLocalPorFecha = data
      this.loadingLocal = false;
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

    ref.onClose.subscribe(()=>{
      this.onClose();
    })
  }

  eliminarTraslado(traslado:Traslado){}

  onClose(){
    this.getTraslados()
  }


  ultimos5Sucursal(){
    this.loadingLocal = true;
    this.trasladoService.ultimos5Sucursal().subscribe(data=>{      
      this.trasladosLocalPorFecha = data
      this.loadingLocal = false;
    })
  }

  hoySucursal(){
    this.loadingLocal = true;
    this.trasladoService.hoySucursal().subscribe(data=>{      
      this.trasladosLocalPorFecha = data
      this.loadingLocal = false;
    })
  }

  buscarTraslado(){
    this.trasladosLocalPorFecha = []
    this.trasladoService.buscarTraslado(this.trasladoId).subscribe(data=>{
      data?this.trasladosLocalPorFecha.push(data):null
    })
  }

}
