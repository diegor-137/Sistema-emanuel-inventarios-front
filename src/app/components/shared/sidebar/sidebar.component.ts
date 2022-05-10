import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  get usuario(){
    return this.authService.usuario;
  }

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

}
