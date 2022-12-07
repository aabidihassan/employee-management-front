import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthenticationGuard } from './guards/auth/authentication/authentication.guard';
import { ServiceAppComponent } from './demo/components/pages/serviceApp/service-app/service-app.component';
import { ListComponent } from './demo/components/conges/list/list/list.component';
import { DemandesComponent } from './demo/components/conges/demandes/demandes/demandes.component';
import { AvertissementsComponent } from './demo/components/process/avertissements/avertissements/avertissements.component';
import { ObservatiosComponent } from './demo/components/process/observations/observatios/observatios.component';
import { SanctionsComponent } from './demo/components/process/sanctions/sanctions/sanctions/sanctions.component';
import { AffectationComponent } from './demo/components/process/sanctions/affectation/affectation/affectation.component';
import { MiseapiedComponent } from './demo/components/process/miseapied/miseapied/miseapied.component';
import { QuestionnaireComponent } from './demo/components/process/enquettes/questionnaire/questionnaire/questionnaire.component';
import { QuestionComponent } from './demo/components/process/enquettes/question/question/question.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'employes', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'services', component: ServiceAppComponent },
                    { path: 'conges', component: ListComponent },
                    { path: 'conges/demandes', component: DemandesComponent },
                    { path: 'avertissements', component: AvertissementsComponent },
                    { path: 'observations', component: ObservatiosComponent },
                    { path: 'sanctions', component: SanctionsComponent },
                    { path: 'sanctions/affectations', component: AffectationComponent },
                    { path: 'misesapied', component: MiseapiedComponent },
                    { path: 'enquettes', children:
                    [
                        { path: '', component: QuestionnaireComponent },
                        { path: 'questions', component: QuestionComponent },
                    ] },
                ],canActivate:[AuthenticationGuard]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
