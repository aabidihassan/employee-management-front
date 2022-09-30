import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from 'src/app/models/employees/employe';
import { Service } from 'src/app/models/services/service';
import { ServiceAppService } from 'src/app/service/servicesApp/service-app.service';
import { Fonction } from 'src/app/models/fonction/fonction';
import { FonctionService } from 'src/app/service/fonction/fonction.service';


interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-service-app',
  templateUrl: './service-app.component.html',
  styleUrls: ['./service-app.component.scss'],
  providers: [MessageService]
})

export class ServiceAppComponent implements OnInit {

    expandedRows: expandedRows = {};

    isExpanded: boolean = false;

    productDialog: boolean = false;

    fonctionDialog: boolean = false;

    fonction : Fonction = new Fonction();

    services: Service[] = [];

    service: Service = new Service();

    product: Product = {};

    submitted: boolean = false;


    constructor(private serviceApp : ServiceAppService, private router : Router, private fonctionService : FonctionService) { }

    ngOnInit() {

        this.serviceApp.getAll().subscribe(data=>{
            this.services = data;
        },err=>{
            this.router.navigate(['/']);
        })

    }

    expandAll() {
        if (!this.isExpanded) {
            this.services.forEach(product => product && product.nom_service ? this.expandedRows[product.nom_service] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    openNewFonction(service: Service){
        this.fonction = new Fonction();
        this.fonction.service = service;
        this.submitted = false;
        this.fonctionDialog = true;
    }

    editService(service: Service){
        this.service = { ...service };
        this.productDialog = true;
    }

    editFonction(fonction : Fonction, service : Service){
        fonction.service = service;
        this.fonction = { ...fonction };
        this.fonctionDialog = true;
        console.log(this.fonction)
    }

    deleteService(service : Service){
        this.serviceApp.delete(service.id_service).subscribe(data=>{
            alert("Service bien supprime");
        },err=>{
            alert("Error, try again");
        })
    }

    deleteFonction(fonction: Fonction){
        this.fonctionService.delete(fonction.id_fonction).subscribe(data=>{
            alert("Fonction bien supprime");
        },err=>{
            alert("Error, try again");
        })
    }

    saveFonction(){
        this.submitted = true;
        console.log(this.fonction)
        this.fonctionService.save(this.fonction).subscribe(data=>{
            this.fonctionDialog = false;
            this.fonction = new Fonction();
            this.ngOnInit();
        },err=>{
            alert("Error, try again");
        })
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.fonctionDialog = false
    }

    saveProduct() {
        this.submitted = true;
        this.serviceApp.save(this.service).subscribe(data=>{
            this.productDialog = false;
            this.service = new Service();
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
    }
}
