import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from '../../../../../../services/recursos-humanos/departamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.css']
})
export class DepartamentoFormComponent implements OnInit {
  
  formDep:FormGroup
  edit:boolean = false
  loading:boolean = false
  titulo = 'Agregar Departamento'
  validator = false
  id:any

  constructor(private departamentoService:DepartamentoService,
              private router:Router,
              private aRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private toastr:ToastrService) {
                this.formDep = this.formBuilder.group({
                  nombre:['',[Validators.required,Validators.maxLength(25),Validators.minLength(5)]],
                  estado:[true]
                })
                
   }

  ngOnInit(): void {
    this.id=0
    const params = this.aRoute.snapshot.params
    if (params){
      this.departamentoService.getDepartamento(params.id).subscribe(
        res => {
          this.edit = true
          this.id = res.id
          this.formDep.patchValue({
            nombre:res.nombre
          })
          this.titulo = 'Editar Departamento' 
        }
      )
    }
  }

  get NombreForm(){
    //console.log(this.formDep);
    return this.formDep.get('nombre')
  }


  agregar(){
    if (this.formDep.invalid) {
      this.validator = true
      return Object.values(this.formDep.controls).forEach(control => {
        control.markAsTouched()
      });
    } else {
        this.departamentoService.createDepartamento(this.formDep.value)
        .subscribe(
          res => {
            this.toastr.success( `Agregado con Exito`,`${res.nombre} agregado`,{
              positionClass:'toast-bottom-right'      
            })
            this.router.navigate(['/dashboard/departamento'])
          },
          err => console.log('object :>> ', err)
          )
      }
      
  }

  actualizar(){
    if (this.formDep.invalid) {
      this.validator = true
      return Object.values(this.formDep.controls).forEach(control => {
        control.markAsTouched()
      });
    } else {

      this.departamentoService.updateDepartamento(this.id,this.formDep.value)
      .subscribe(
        res=>{
          this.toastr.success( `Modificado con Exito`,'Registro Modificado',{
            positionClass:'toast-bottom-right'      
          })
          this.router.navigate(['/dashboard/departamento'])
        }
      )
    }
  } 

}
