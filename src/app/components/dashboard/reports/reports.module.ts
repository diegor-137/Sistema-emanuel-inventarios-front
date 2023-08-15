import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModule } from '../../shared/shared.module';
import { PrimeModule } from '../../prime/prime.module';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.routes';
import { UtilidadComponent } from './finanzas-report/utilidad/utilidad.component';
import { FormsModule } from '@angular/forms';
import { ReportViewComponent } from './report-view/report-view.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';




@NgModule({
  declarations: [
ReportsComponent,
UtilidadComponent,
ReportViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule, 
    PrimeModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
  ]
})
export class ReportModule { }
