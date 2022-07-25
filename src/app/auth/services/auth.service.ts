import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../classes/auth-user';
import { catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Role } from 'src/app/app.roles';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL: string = environment.BASE_URL;
  private _usuario!: Usuario

  get usuario() {
    return { ... this._usuario };
  }

  constructor(private http: HttpClient) { }

  login(user: string, password: string) {
    const body = { user, password }
    return this.http.post<AuthResponse>(`${this.BASE_URL}/auth/login`, body)
      .pipe(
        tap(resp => {
          if (resp.ok) localStorage.setItem('token', resp.accessToken!)
        }),
        map(valid => valid.ok),
        catchError(err => of(err.error.message))
      );
  }

  validarToken() {
    const url = `${this.BASE_URL}/auth/profile`;
    /* const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }) */
    return this.http.get<AuthResponse>(url)
      .pipe(
        map(resp => {          
          this._usuario = {
            id:resp.id, user:resp.user, role: resp.role, empleado: resp.empleado, accessToken: resp.accessToken           
          }                    
          return resp.ok
        }),
        catchError(err => of(false))
      )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear()
  }

  areUserRolesAllowed(userRoles: string[], allowedUserRoles: Role[]): boolean {
    for (const role of userRoles) {
      for (const allowedRole of allowedUserRoles) {
        if (role.toLowerCase() === allowedRole.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }
}
