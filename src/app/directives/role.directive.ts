import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { CajaConfigService } from '../components/dashboard/finanzas/caja/services/cajaConfig.service';

@Directive({
  selector: '[appRole]'
})
export class RoleDirective implements OnInit {

  @Input() public appRole!: Array<string>;
  isVisible = false;
  caja:any
  get usuario() {
    return this.authService.usuario;
  }
  constructor(private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private cajaConfigService:CajaConfigService) { }

  ngOnInit(){      
    if (!this.usuario.role) {
      this.viewContainerRef.clear();
    }
    if (this.usuario.role?.some(r =>this.appRole.includes(r))) {
      // If it is already visible (which can happen if
      // his roles changed) we do not need to add it a second time
      if (!this.isVisible) {
        // We update the `isVisible` property and add the 
        // templateRef to the view using the 
        // 'createEmbeddedView' method of the viewContainerRef
        this.isVisible = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    } else {
      // If the user does not have the role, 
      // we update the `isVisible` property and clear
      // the contents of the viewContainerRef
      this.isVisible = false;
      this.viewContainerRef.clear();
    }

    const roles: Array<String> = ['CAJERO']   
    const roleUser: Array<String> = this.authService.usuario.role;

    if (roleUser.some(r =>roles.includes(r))) {
      this.cajaConfigService.cajeroCaja(this.authService.usuario.empleado.id!).subscribe(resp=> {
        this.caja = resp  
        if(!this.caja || !this.caja.status) {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }; 
      });       
    }
  }
}
