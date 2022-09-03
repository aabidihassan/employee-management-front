import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeComponent } from '../Employe/employe/employe.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: ':id', component: EmployeComponent }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
