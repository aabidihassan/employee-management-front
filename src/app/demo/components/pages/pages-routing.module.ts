import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeComponent } from '../Employe/employe/employe.component';
import { EducationComponent } from './employe/champs_cv/champs/education/education/education.component';
import { ProfessionnelComponent } from './employe/champs_cv/champs/professionnel/professionnel/professionnel.component';
import { StageComponent } from './employe/champs_cv/champs/stage/stage/stage.component';
import { ContactComponent } from './employe/contact/contact/contact.component';
import { DonneesComponent } from './employe/donnees/donnees/donnees.component';
import { FamilleComponent } from './employe/famille/famille/famille.component';
import { FichiersComponent } from './employe/fichiers/fichiers/fichiers.component';
import { FonctionComponent } from './employe/fonction/fonction/fonction.component';
import { PersonnelComponent } from './employe/personnel/personnel/personnel.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: ':matricule', component: EmployeComponent, children:[
            { path: '', component: PersonnelComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'famille', component: FamilleComponent },
            { path: 'personnel', component: PersonnelComponent },
            { path: 'donnees', component: DonneesComponent },
            { path: 'fonction', component: FonctionComponent },
            { path: 'cv', children: [
                { path: 'educations', component: EducationComponent },
                { path: 'professionnels', component: ProfessionnelComponent },
                { path: 'stages', component: StageComponent },
            ] },
            { path: 'fichiers', component: FichiersComponent },
        ] }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
