import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NoAuthorizationComponent } from './no-authorization/no-authorization.component';

const routes: Routes = [

  {
    path:'',
    component: MainComponent,
    children: [
      {path: 'login', component:LoginComponent},
      {path: 'no-authorization', component:NoAuthorizationComponent},
      {path: '**', redirectTo: 'login'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
