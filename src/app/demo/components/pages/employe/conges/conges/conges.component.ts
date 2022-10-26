import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Conge } from 'src/app/models/conges/conge/conge';
import { Demande } from 'src/app/models/conges/demande/demande';
import { Employe } from 'src/app/models/employees/employe';
import { DemandesService } from 'src/app/service/conges/demande/demandes.service';
import { ServiceAppService } from 'src/app/service/servicesApp/service-app.service';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.scss'],
  providers: [MessageService]
})
export class CongesComponent implements OnInit {

    expandedRows: expandedRows = {};

    isExpanded: boolean = false;

    productDialog: boolean = false;

    fonctionDialog: boolean = false;

    demande : Demande = new Demande();

    conges: Conge[] = []

    submitted: boolean = false;

    employe : Employe = JSON.parse(localStorage.getItem('employe')!);

    services : Employe[] = [];

    selectedetat !: string;


    deleteProductDialog: boolean = false;


    constructor(private demandeService : DemandesService, private serviceService : ServiceAppService) { }

    ngOnInit() {

        this.conges = this.employe.conges;

        this.serviceService.getEmployesByService(this.employe.fonction?.service?.id_service).subscribe(data=>{
            this.services = data;
            this.services = this.services.filter(emp => emp.id_employe!=this.employe.id_employe);
        },err=>{
            this.services = [];
        })

    }

    expandAll() {
        if (!this.isExpanded) {
            this.conges.forEach(conge => conge && conge.annee.annee ? this.expandedRows[conge.annee.annee] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    action(dem:Demande, etat:string){
        this.deleteProductDialog = true;
        this.demande = dem;
        this.selectedetat = etat;
    }

    openNewFonction(conge: Conge){
        this.demande = new Demande();
        this.demande.conge = conge;
        this.submitted = false;
        this.fonctionDialog = true;
    }

    confirmDelete() {
        this.demande.etat.etat = this.selectedetat;
        this.demandeService.save(this.demande).subscribe(data=>{
            this.deleteProductDialog = false;
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
    }

    saveFonction(){
        this.submitted = true;
        this.demandeService.save(this.demande).subscribe(data=>{
            this.fonctionDialog = false;
            this.demande = new Demande();
            this.ngOnInit();
        },err=>{
            alert("Error, try again");
        })
    }

    hideDialog() {
        this.fonctionDialog = false;
        this.submitted = false;
        this.deleteProductDialog = false;
        this.demande = new Demande();
    }

}
