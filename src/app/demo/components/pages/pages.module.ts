import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { EducationComponent } from './employe/champs_cv/champs/education/education/education.component';
import { ProfessionnelComponent } from './employe/champs_cv/champs/professionnel/professionnel/professionnel.component';
import { StageComponent } from './employe/champs_cv/champs/stage/stage/stage.component';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        TableModule,
        ToolbarModule
    ]
})
export class PagesModule { }
