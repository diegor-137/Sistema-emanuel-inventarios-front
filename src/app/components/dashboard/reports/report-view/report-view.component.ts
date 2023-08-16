import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';


@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
})
export class ReportViewComponent implements OnInit {

  src:string

  constructor(public config: DynamicDialogConfig) {
    this.src = this.config.data.src
   }

  ngOnInit(): void {
  }

}
