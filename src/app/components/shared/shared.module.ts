import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule } from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule } from '@angular/material/sidenav';
import {MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatCardModule} from '@angular/material/card';  
import { RoleDirective } from 'src/app/directives/role.directive';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfigGlobalDirective } from 'src/app/directives/config-global.directive';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    SidebarComponent,
    RoleDirective,
    ConfigGlobalDirective
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,  
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  exports:[
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSortModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    NavBarComponent,
    FooterComponent,
    SidebarComponent,
    MatDialogModule,
    MatAutocompleteModule,
    MatCardModule,
    MatCheckboxModule,
    ConfigGlobalDirective,
    RoleDirective,
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class SharedModule { }
