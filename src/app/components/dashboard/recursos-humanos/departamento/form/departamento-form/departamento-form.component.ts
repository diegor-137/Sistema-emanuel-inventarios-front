import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.css']
})
export class DepartamentoFormComponent implements OnInit {
  
  edit:boolean = false
  loading:boolean = false
  titulo = 'Agregar Empleado'
  validator = false

  constructor() { }

  ngOnInit(): void {
  }

  agregarDepartamento(){
      
  }

}
