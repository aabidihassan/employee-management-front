import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CompteComponent } from './employe/compte/compte/compte.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PagesRoutingModule,
        TableModule,
        ToolbarModule
    ]
})
export class PagesModule { }
