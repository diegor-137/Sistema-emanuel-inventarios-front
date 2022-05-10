import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading=false
  form:FormGroup
  
  constructor(private fb:FormBuilder,
              private _snackBar: MatSnackBar,
              private router:Router,
              private authService:AuthService
              ) {
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  login(){
    const {usuario, password} = this.form.value;
    this.authService.login(usuario, password).subscribe(ok =>{      
      if(ok ===true){      
        this.fakeLoading()
      }else{      
        this.error(ok)
      }
    });
  }


/*   ingresar(){
    //console.log(this.form);
    const usuario = this.form.value.usuario
    const password = this.form.value.password

    if (usuario == 'abel' && password == 'abel') {
      this.fakeLoading()
    }else{
      this.error('Usuario o pass no validos');
      this.form.reset()
    }
  } */

  error(message:string){
    this._snackBar.open(message,'',{
      duration:4000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    })
  }

  fakeLoading(){
    this.loading =true
    setTimeout(() => {
      this.router.navigate(['dashboard'])
    }, 1500);
  }
}
