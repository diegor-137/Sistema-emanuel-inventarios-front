import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from '../../../../interfaces/recursos-humanos/departamento';
import { DepartamentoService } from '../../../../services/recursos-humanos/departamento.service';



@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  Departamento:Departamento[] = []

  displayedColumns: string[] = ['id', 'nombre','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departamentoService:DepartamentoService) { }

  ngOnInit(): void {
    this.getDepartamento()
  }

  getDepartamento(){
    this.departamentoService.getDepartamentos().subscribe(data=>{
      this.Departamento = data
      this.dataSource = new MatTableDataSource (this.Departamento) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit() {
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
