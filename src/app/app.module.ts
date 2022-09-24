import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorInterceptor } from './interceptors/auth/token-interceptor.interceptor';
import { EmployeComponent } from './demo/components/Employe/employe/employe.component';
import { MenubarModule } from 'primeng/menubar';
import { ServiceAppComponent } from './demo/components/pages/serviceApp/service-app/service-app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ContactComponent } from './demo/components/pages/employe/contact/contact/contact.component';
import { PersonnelComponent } from './demo/components/pages/employe/personnel/personnel/personnel.component';
import { FamilleComponent } from './demo/components/pages/employe/famille/famille/famille.component';
import { DonneesComponent } from './demo/components/pages/employe/donnees/donnees/donnees.component';
import { FonctionComponent } from './demo/components/pages/employe/fonction/fonction/fonction.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        EmployeComponent,
        ServiceAppComponent,
        ContactComponent,
        PersonnelComponent,
        FamilleComponent,
        DonneesComponent,
        FonctionComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        HttpClientModule,
        MenubarModule,
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorInterceptor, multi:true},
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
