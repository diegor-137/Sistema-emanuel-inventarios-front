import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { EfectivoService } from '../service/efectivo.service';
import { Efectivo } from '../interface/efectivo';
import { TransaccionEfectivoFormComponent } from '../transaccion-efectivo-form/transaccion-efectivo-form.component';

@Component({
  selector: 'app-efectivo-list',
  templateUrl: './efectivo-list.component.html',
  styleUrls: ['./efectivo-list.component.css'],
  providers: [DialogService]
})
export class EfectivoListComponent implements OnInit {
  myParam!: string;

  efectivo!:Efectivo
  loading:boolean = false
  load:boolean = false

  constructor(private route: ActivatedRoute, private router: Router, 
    public efectivoService:EfectivoService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDetail(){
    this.loading = true
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.efectivoService.getCuentasDetail(Number(this.myParam)).subscribe(data=>{
      this.efectivo = data;
      this.loading = false
      this.load = true
    })
  }

  transaccion(){
    this.efectivoService.resetFormBuilder()
    this.efectivoService.initializeFormBuilder();
    const ref =this.dialogService.open(TransaccionEfectivoFormComponent, {
      data: {
        cuenta:this.efectivo
      },
      header: 'Registrar transaccion',
      width: '50%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe(()=>{
      this.getDetail();
    })

  }

  regresar(){
    this.router.navigate(['../../efectivo'], {relativeTo: this.route})
  }

}
