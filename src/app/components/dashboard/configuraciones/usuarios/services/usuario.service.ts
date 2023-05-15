import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL: string = environment.BASE_URL;
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  form!:FormGroup

  constructor(private formBuilder:FormBuilder, private http:HttpClient) {
    this.form=this.formBuilder.group({ 
      id: [],   
      user: ['', [Validators.required], [this.userNameAsyncValidator]],
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirm: ['', [this.confirmValidator]],
      roles:[null, Validators.required], 
      empleado:this.formBuilder.group({
        nombre: [null,[Validators.required] ],
        apellido: [null, [Validators.required]],
        direccion: [null, [Validators.required]],
        telefono: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.pattern(this.emailPattern)], [this.userEmailAsyncValidator]],
        foto:[]
      }),
    })
   }


  create(){
    return this.http.post<any>(`${this.BASE_URL}/user`, this.form.value)
  }

  findAll(){
    return this.http.get<User[]>(`${this.BASE_URL}/user`);
  }

  findOneUserName(user:string){
    return this.http.get<boolean>(`${this.BASE_URL}/user/name/${user}`);
  }

  findOneUserEmail(email:string){
    return this.http.get<boolean>(`${this.BASE_URL}/user/email/${email}`);
  }

  uploadFile(file:File){
    const fd = new FormData();
    fd.append("file", file)
    const id = this.form.controls.id.value;
    return this.http.post<any>(`${this.BASE_URL}/user/upload/${id}`, fd)
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.form.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
        this.findOneUserName(control.value).subscribe(resp=>{          
            if (resp) {
              console.log(resp);
              observer.next({ duplicated: true });
            } else {
              observer.next(null);
            }
            observer.complete();
        })        
    });
    userEmailAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
        this.findOneUserEmail(control.value).subscribe(resp=>{          
            if (resp) {
              console.log(resp);              
              observer.next({ emailDuplicated: true });
            } else {
              observer.next(null);
            }
            observer.complete();
        })        
    });  

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.form.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };
}
