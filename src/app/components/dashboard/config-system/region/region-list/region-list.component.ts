import { Component, OnInit } from '@angular/core';
import { Region } from '../interfaces/region-interface';
import { RegionService } from '../services/region.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  Regiones:Region[] = []
  loading:boolean
  dialog=false

  constructor(public service:RegionService,
    private toastr:ToastrService,
    private messageService: MessageService) {
      this.loading = true
     }

  ngOnInit(): void {
  }

  getRegiones(event: LazyLoadEvent){
    setTimeout(() => {

    this.service.getRegiones().subscribe(data=>{
      this.Regiones = data
      this.loading = false;
    })
    }, 100);
  }

    openCreate(){    
    this.service.resetFormBuilder();
    this.service.initializeFormBuilder();
    this.service.configNuevo()
    this.dialog = true;
  }

    openEdit(data:Region){ 
      this.service.resetFormBuilder();
      this.service.initializeFormBuilder();
      this.service.configEdit()
      this.service.llenarFormulario(data)
      this,this.dialog = true;
  }

  get NombreForm(){
    return this.service.form.get('nombre')
  }

  close(){
    this.dialog = false
    this.service.resetFormBuilder();
    this.service.initializeFormBuilder();
  }

  create(){
    this.service.createRegion().subscribe((res)=>{
      this.Regiones.push(res)
      this.toastr.success( `Agregado con Exito`,`${res.nombre} agregado`,{positionClass:'toast-bottom-right'})
      this.close()      
    },
    err => {
      this.toastr.error(`${err.message}`,`Succedio un error`,{positionClass:'toast-bottom-right'})
    }
    )
  }

  update(){
    this.service.updateRegion().subscribe((res)=>{
      this.Regiones[this.findIndexById(res.id)] = res
      this.toastr.success( `Agregado con Exito`,`${res.nombre} agregado`,{positionClass:'toast-bottom-right'})
      this.close()
    },
    err => {
      this.toastr.error(`${err.message}`,`Succedio un error`,{positionClass:'toast-bottom-right'})
    })
    this.Regiones = [...this.Regiones];
  }
  findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.Regiones.length; i++) {
            if (this.Regiones[0].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }
  
  eliminarRegion(producto:any){

        
      
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteRegion(+producto.id)
          .subscribe(
            res=>{
              this.toastr.error(`Compra #${res.nombre} eliminada`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.Regiones = this.Regiones.filter(val => val.id !== producto.id)
                  },
            error => {
              this.toastr.error(`${error.message}`,`Succedio un error`,{
                positionClass:'toast-bottom-right'      
              })
            }
          ) 
        }
      })
  }
}
