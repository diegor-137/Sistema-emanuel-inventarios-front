import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Role } from '../app.roles';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanLoad, CanActivate {

  get usuario() {
    return this.authService.usuario;
  }

  constructor(private authService: AuthService, private router: Router) { }

  canLoad(route: Route): Observable<boolean> | boolean {
    const allowedUserRoles = this.getRoutePermissions(route);
    return this.checkSession(allowedUserRoles);
  }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    const allowedUserRoles = this.getRoutePermissions(route);
    return this.checkSession(allowedUserRoles);
  }



  private checkSession(allowedUserRoles: Role[]) {
    return this.authService.validarToken().pipe(
      tap(valid => {
        if (valid) {
          const role = (allowedUserRoles.length !== 0) ? true : false;
          !role ? null : !this.authService.areUserRolesAllowed(this.usuario.role!, allowedUserRoles) ? this.router.navigateByUrl('/auth/no-authorization') : null;
        } else {
          this.router.navigateByUrl('/auth')
        }
      })
    );
  }


  private getRoutePermissions(route: ActivatedRouteSnapshot | Route): Role[] {
    if (route.data && route.data.userRoles) {
      return route.data.userRoles as Role[];
    }
    return [];
  }

}