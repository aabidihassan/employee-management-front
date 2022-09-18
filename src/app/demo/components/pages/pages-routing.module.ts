import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeComponent } from '../Employe/employe/employe.component';
import { ContactComponent } from './employe/contact/contact/contact.component';
import { DonneesComponent } from './employe/donnees/donnees/donnees.component';
import { FamilleComponent } from './employe/famille/famille/famille.component';
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
            { path: 'fonction', component: FonctionComponent }
        ] }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
