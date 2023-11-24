import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Caja, Empleado } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css'],
})
export class CajaComponent implements OnInit, AfterViewChecked {

  cajaDialog!: boolean;
  selectedCajas!: Caja[];
  cajas!: Caja[]
  empleados!:Empleado[]

  constructor(public readonly cajaConfigService:CajaConfigService, 
              private readonly changeDetectorRef: ChangeDetectorRef,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
                
               }

  ngOnInit(): void { 
    this.getCajas();     
    this.getCajeros();  
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  getCajas(){
    this.cajaConfigService.cajas().subscribe(resp =>{this.cajas = resp
      console.log(this.cajas);
      
    })
  }

  getCajeros(){
    this.cajaConfigService.cajeros().subscribe(resp=>this.empleados = resp)
  }

  registrarCaja(){
      this.onClear()
      this.getCajeros();         
      this.cajaDialog = true;        
  }

  editCaja(caja: Caja) {
    this.confirmationService.confirm({
      message: `¿Estas seguro de deshabilitar la caja '${caja.nombre}' del empleado '${caja.empleado.nombre} ${caja.empleado.apellido}'?`,
      header: 'Quieres deshabilitar esta caja?',
      icon: 'pi pi-info-circle',
      accept: () => {
          this.cajaConfigService.disableCaja(caja.id).subscribe(()=>{
            this.messageService.add({severity:'success', summary:'Guardado', detail: 'Se ha deshabilitado la caja.'});
            this.getCajas();
          }, e =>{
            this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
          })
      }
  }); 
  }

  save() {
    this.cajaConfigService.caja().subscribe(()=>{
      this.messageService.add({severity:'success', summary:'Guardado', detail: 'Se ha registrado la caja!'});
      this.getCajas();
      this.hideDialog() 
    },e =>{
      this.messageService.add({severity:'error', summary:'No', detail: e.error.message});    
    })  
  }

  hideDialog() { 
    this.cajaDialog = false;
    this.onClear()
  }

  campoValido(campo:string){
    return this.cajaConfigService.form.get(campo)?.errors
            && this.cajaConfigService.form.get(campo)?.touched;
  }

  onClear(){    
    this.cajaConfigService.form.get('nombre')?.setErrors(null)
    this.cajaConfigService.form.get('empleado.id')?.setErrors(null)
    this.cajaConfigService.form.get('monto')?.setErrors(null)
    this.cajaConfigService.form.get('montoCajaChica')?.setErrors(null)
    this.cajaConfigService.form.reset()
  }
}


