import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Conge } from 'src/app/models/conges/conge/conge';
import { Demande } from 'src/app/models/conges/demande/demande';
import { Etat } from 'src/app/models/conges/etat/etat';
import { Employe } from 'src/app/models/employees/employe';
import { DemandesService } from 'src/app/service/conges/demande/demandes.service';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
    templateUrl: './demandes.component.html',
    providers: [MessageService]
})
export class DemandesComponent implements OnInit {

    demandes: Demande[] = [];
    etats !: Etat[];
    etat !: Etat;
    demande !: Demande;
    employes : Employe[] = [];
    employe : Employe = new Employe();
    bool : boolean = false;
    submitted: boolean = false;
    productDialog: boolean = false;
    initiale !: Array<Demande>;

    constructor(private demandesService : DemandesService, private router : Router, private employeService : EmployesServiceService) { }

    ngOnInit() {

        this.etats = [
            { etat : 'Tous' },
            { etat : 'En Attente' },
            { etat : 'Confirmée' },
            { etat : 'Annulée' },
        ];

        this.etat = { etat:'Tous' }

        this.demande = new Demande();

        if(history.state.conge==null){
            this.demandesService.getAll().subscribe(data=>{
                this.demandes = data;
                this.initiale = data;
            },err=>{
                this.router.navigate(['/']);
            })
            this.employeService.getAll().subscribe(data=>{
                this.employes = data;
            },err=>{
                this.router.navigate(['/']);
            })
        }else {
            this.bool = true;
            this.employe = history.state.conge.employe;
            this.employes.push(this.employe)
            this.demande.conge = history.state.conge;
            this.employe.conges = new Array<Conge>;
            this.employe.conges.push(this.demande.conge);
            this.demandes = history.state.conge.demandes;
            this.initiale = history.state.conge.demandes;
        }
    }

    changeEtat(){
        console.log(this.initiale)
        if(this.etat.etat!='Tous') this.demandes = this.initiale.filter(dem=> dem.etat.etat==this.etat.etat)
        else this.demandes = this.initiale;
    }

    openNew() {
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    saveDemande() {
        this.submitted = true;
        this.demande.conge.employe.conges = [];
        this.demande.nb_jour = this.calculateDiff(this.demande.date_debut, this.demande.date_fin);
        this.demandesService.save(this.demande).subscribe(data=>{
            this.productDialog = false;
            this.submitted = false;
            this.demandes.push(data);
        },err=>{
            alert("Error, try again")
        })
    }

    action(demande:Demande, etat:string){
        demande.etat.etat = etat;
        this.demandesService.save(demande).subscribe(data=>{
            this.ngOnInit();
        },err=>{
            alert("Error, try again")
        })
    }

    calculateDiff(de:string, jusqua:string){
        let datefin = new Date(jusqua);
        let datedebut = new Date(de);

        let nb = Math.floor((Date.UTC(datefin.getFullYear(), datefin.getMonth(), datefin.getDate()) - Date.UTC(datedebut.getFullYear(), datedebut.getMonth(), datedebut.getDate()) ) /(1000 * 60 * 60 * 24))+1;
        while(datedebut<=datefin){
            var day = datedebut.getDay();
            if(day===6 || day===0) nb--;
            datedebut.setDate(datedebut.getDate() + 1);
        }
        return nb;
    }

}
