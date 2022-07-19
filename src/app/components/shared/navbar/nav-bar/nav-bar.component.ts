import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


  get usuario(){
    return this.authService.usuario;
  }

  constructor(private router: Router,
              private authService:AuthService          
    ) { }

  ngOnInit(): void {}

  logout(){
      this.router.navigateByUrl('/auth');
      this.authService.logout()
  }

}
