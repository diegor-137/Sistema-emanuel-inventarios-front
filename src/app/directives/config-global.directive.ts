import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { ConfiguracionGlobalService } from '../components/dashboard/configuraciones/configuracion/services/configuracion-global.service';
import { PuestoService } from '../components/dashboard/recursos-humanos/puesto/services/puesto.service';

@Directive({
  selector: '[appConfigGlobal]'
})
export class ConfigGlobalDirective implements OnInit {

  @Input() public appConfigGlobal!: Array<string>;
  isVisible = false;
  permisos: any[]=[];
  constructor(private service: ConfiguracionGlobalService, private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  async ngOnInit() {
    this.service.getPermisos().subscribe(data =>{
      this.permisos =data;      
      this.showTemplate()
    });


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
  }


  showTemplate() {      
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



}


interface config {
  id: number;
  name: string;
  checked: boolean;

}