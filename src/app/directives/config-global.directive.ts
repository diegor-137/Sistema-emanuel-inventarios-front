import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConfiguracionGlobalService } from '../components/dashboard/configuraciones/configuracion/services/configuracion-global.service';
import { ConfiguracionGlobal } from '../components/dashboard/configuraciones/configuracion/interface/configuracion-global';

@Directive({
  selector: '[appConfigGlobal]'
})
export class ConfigGlobalDirective implements OnInit {

  @Input() public appConfigGlobal!: Array<string>;
  isVisible = false;
  configuracionGlobal!: ConfiguracionGlobal;
  constructor(private service: ConfiguracionGlobalService, private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  async ngOnInit() {
    this.service.getConfiguraciones().subscribe(data =>{
      this.configuracionGlobal =data;      
      this.bancoTemplate()
    });
  }
  
  bancoTemplate(){
    console.log('Desde el banco template');
    
    if (!this.configuracionGlobal.cuentaBancaria) {
      if (!this.isVisible) {
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {
      this.isVisible = false;
      this.viewContainerRef.clear();
    }
      
  }

      /* if (!this.permisos) {
      this.viewContainerRef.clear();
    }
    if (this.permisos?.some(r =>this.appConfigGlobal.includes(r.name))) {
      if (!this.isVisible) {

        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {

      this.isVisible = false;
      this.viewContainerRef.clear();
    } */

/*   showTemplate() {      
    if (!this.permisos) {
      this.viewContainerRef.clear();
    }
    if (this.permisos?.some(r =>this.appConfigGlobal.includes(r.name))) {
      if (!this.isVisible) {

        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {

      this.isVisible = false;
      this.viewContainerRef.clear();
    }
  }
 */


}


interface config {
  id: number;
  name: string;
  checked: boolean;

}