import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { Employe } from 'src/app/models/employees/employe';
import { Conge } from 'src/app/models/conges/conge/conge';
import { CongesService } from 'src/app/service/conges/conges.service';
import { AnneeService } from 'src/app/service/annee/annee.service';
import { Annee } from 'src/app/models/annee/annee';

@Component({
    templateUrl: './list.component.html',
    providers: [MessageService]
})
export class ListComponent implements OnInit {

    conges: Conge[] = [];

    year !: Annee;
    years : Annee[] = [];

    constructor(private congeService : CongesService, private router : Router, private anneeService : AnneeService) { }

    ngOnInit() {

        this.anneeService.getAll().subscribe(data=>{
            this.years = data;
        },err=>{
            this.router.navigate(['/']);
        })
    }

    changeYear(){
        this.congeService.getAllByYear(this.year.annee).subscribe(data=>{
            this.conges = data;
        },err=>{
            this.ngOnInit();
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    viewEmploye(conge : Conge){
        this.router.navigate(['conges/'+conge.employe.matricule], { state: { conge : conge } })

    }
}
