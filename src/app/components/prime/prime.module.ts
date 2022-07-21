import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DividerModule} from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import {ProgressBarModule} from 'primeng/progressbar';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToolbarModule} from 'primeng/toolbar';
import {InputTextModule} from 'primeng/inputtext';

import {SliderModule} from 'primeng/slider';
import {ContextMenuModule} from 'primeng/contextmenu';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import { ChipModule } from 'primeng/chip';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    DividerModule,
    CheckboxModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    ProgressBarModule, 
    DynamicDialogModule,
    ToolbarModule,
    InputTextModule,

    SliderModule,
    ContextMenuModule,
    FileUploadModule,
    RatingModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    OverlayPanelModule,
    PanelModule,
    TabViewModule,
    ChipModule,
    TooltipModule
  ]
})
export class PrimeModule { }
