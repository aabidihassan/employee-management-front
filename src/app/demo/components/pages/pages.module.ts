import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FamilleComponent } from './employe/famille/famille/famille.component';
import { DonneesComponent } from './employe/donnees/donnees/donnees.component';
import { FonctionComponent } from './employe/fonction/fonction/fonction.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
