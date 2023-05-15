import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { Role } from 'src/app/app.roles';

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
      userSave:[],
      emailSave:[],
      password: ['', [Validators.required, Validators.minLength(9)]],
      confirm: ['', [this.confirmValidator]],
      roles:[[this.confirmValidator]],
      fotoSend:[], 
      empleado:this.formBuilder.group({
        id: [],
        nombre: [null,[Validators.required] ],
        apellido: [null, [Validators.required]],
        direccion: [null, [Validators.required]],
        telefono: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.pattern(this.emailPattern)], [this.userEmailAsyncValidator]],        
        foto:[],
        sucursal: this.formBuilder.group({
          id:[Validators.required]
        }),        
      }),
    })
   }


  create(user:User){
    const fd = new FormData();
    fd.append("user",user.user);
    fd.append("password",user.password);
    fd.append("roles[]",user.roles);
    fd.append("fotoSend",user.fotoSend);

    fd.append("empleado[nombre]",user.empleado.nombre);
    fd.append("empleado[apellido]",user.empleado.apellido);
    fd.append("empleado[direccion]",user.empleado.direccion);
    fd.append("empleado[telefono]",user.empleado.telefono);
    fd.append("empleado[email]",user.empleado.email);
    fd.append("empleado[sucursal][id]", String(user.empleado.sucursal.id));


    return this.http.post<any>(`${this.BASE_URL}/user/create/admins`, fd)
  }
  edit(user:User){
    const fd = new FormData();
    fd.append("id",String(user.id!));
    fd.append("user",user.user);
    fd.append("password",user.password);
    fd.append("roles[]",user.roles);
    fd.append("fotoSend",user.fotoSend);

    fd.append("empleado[id]", String(user.empleado.id));
    fd.append("empleado[nombre]",user.empleado.nombre);
    fd.append("empleado[apellido]",user.empleado.apellido);
    fd.append("empleado[direccion]",user.empleado.direccion);
    fd.append("empleado[telefono]",user.empleado.telefono);
    fd.append("empleado[email]",user.empleado.email);
    fd.append("empleado[sucursal][id]", String(user.empleado.sucursal.id));
    return this.http.put<any>(`${this.BASE_URL}/user/update/admins`, fd)
  }

  findAdmins(){
    return this.http.get<User[]>(`${this.BASE_URL}/user/find/admins`);
  }

  findOneUserName(user:string){
    return this.http.get<User>(`${this.BASE_URL}/user/name/${user}`);
  }

  findOneUserEmail(email:string){
    return this.http.get<User>(`${this.BASE_URL}/user/email/${email}`);
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.form.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
        this.findOneUserName(control.value).subscribe(resp=>{               
            if (control.value === resp?.user && control.value != this.form.controls['userSave'].value) {
              observer.next({ duplicated: true });
            } else {
              observer.next(null);
              console.log('hola');
              
            }
            observer.complete();
        })        
    });
    userEmailAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
        this.findOneUserEmail(control.value).subscribe(resp=>{          
            if (control.value === resp?.empleado.email && control.value != this.form.controls['emailSave'].value) {             
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
