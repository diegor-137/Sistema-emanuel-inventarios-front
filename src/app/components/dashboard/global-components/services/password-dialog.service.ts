import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordDialogService {

  private BASE_URL: string = environment.BASE_URL;
  private customHttpClient!: HttpClient

  constructor(private http: HttpClient, backend: HttpBackend) {
    this.customHttpClient = new HttpClient(backend);
  }

  authorization(user: string, password: string) {
    const body = { user, password }
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, body);
  }

  profile(token:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.customHttpClient.get<any>(`${this.BASE_URL}/auth/profile`, { headers });
  }
}
