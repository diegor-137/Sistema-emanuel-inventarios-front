import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TipoGasto } from './interface/tipo-gasto';
import { TipoGastoService } from './services/tipo-gasto.service';
import { TipoGastoFormComponent } from './tipo-gasto-form/tipo-gasto-form.component';

@Component({
  selector: 'app-tipo-gasto',
  templateUrl: './tipo-gasto.component.html',
  styleUrls: ['./tipo-gasto.component.css']
})
export class TipoGastoComponent implements OnInit {

  tipoGastos!:TipoGasto[]

  constructor(public dialogService: DialogService, private tipoGastoService:TipoGastoService) { }

  ngOnInit(): void {
    this.getAllTipoGastos();
  }

  registrarTipoGasto(){
    const ref = this.dialogService.open(TipoGastoFormComponent, {
      header: 'Crear Tipo Gasto',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })

    ref.onClose.subscribe(()=>{
      this.getAllTipoGastos()
    })
  }

  getAllTipoGastos(){
    this.tipoGastoService.getAllTipoGastos().subscribe({next:(resp)=>{
          this.tipoGastos = resp
      }, error:(e)=>{
          console.error(e); 
      }
    })
  }
}
