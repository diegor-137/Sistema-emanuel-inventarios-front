import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  styleUrls: ['./dashboard.component.css'],
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer:BreakpointObserver,
              private cd:ChangeDetectorRef) {
    
  }


  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:1000px)']).subscribe((res)=>{
      if (res.matches) {
        this.sidenav.mode = 'over'
        this.sidenav.close()
      }else {
        this.sidenav.mode = 'side',
        this.sidenav.open()
      }
    })
  
    this.cd.detectChanges()
  }

}
