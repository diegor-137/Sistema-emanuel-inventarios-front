import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../app.roles';
import { AuthService } from '../auth/services/auth.service';
import { CajaConfigService } from '../components/dashboard/finanzas/caja/services/cajaConfig.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarCajaGuard implements CanLoad, CanActivate {

  caja:any
  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService, private router: Router, private cajaConfigService:CajaConfigService) {}

  canLoad(): Observable<boolean> | boolean {
    return this.check();
  }
  canActivate(): Observable<boolean> | boolean {
    return this.check();
  }
  private check() {
    const roles: Array<String> = ['CAJERO']   
    const roleUser: Array<String> = this.authService.usuario.role;

    if (roleUser.some(r =>roles.includes(r))) {
      this.cajaConfigService.cajeroCaja(this.authService.usuario.empleado.id!).subscribe(resp=> {
        this.caja = resp  
        if(!this.caja || !this.caja.status) {
          this.router.navigateByUrl('/auth/no-authorization')
        }; 
      });       
    }    
    return true;    
  }
}