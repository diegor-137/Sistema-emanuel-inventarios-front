import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NophotoPipe } from './nophoto.pipe';


@NgModule({
    declarations: [
        NophotoPipe
    ],
    exports: [
        NophotoPipe
    ],
    imports: [
        CommonModule
    ]
})
export class PipesModule { }