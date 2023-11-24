import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TipoGastoService } from '../services/tipo-gasto.service';

@Component({
  selector: 'app-tipo-gasto-form',
  templateUrl: './tipo-gasto-form.component.html'
})
export class TipoGastoFormComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, public ref: DynamicDialogRef, private tipoGastoService:TipoGastoService) { }

  form = this.formBuilder.group({
    nombre:['', [Validators.required]],
  })

  ngOnInit(): void {
  }

  crearTipoGasto(){
    this.tipoGastoService.crearTipoGasto(this.form).subscribe({next:()=>{
        this.ref.close();
      }, error:(e)=>{
        console.error(e);
      }
    })
  }

}
