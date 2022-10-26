import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CongesComponent } from './employe/conges/conges/conges.component';

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
