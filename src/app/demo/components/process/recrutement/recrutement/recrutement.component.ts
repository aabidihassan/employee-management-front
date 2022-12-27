import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Employe } from 'src/app/models/employees/employe';
import { Fonction } from 'src/app/models/fonction/fonction';
import { Recrutement } from 'src/app/models/recrutement/recrutement';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { FonctionService } from 'src/app/service/fonction/fonction.service';
import { RecrutementService } from 'src/app/service/recrutement/recrutement.service';

@Component({
  selector: 'app-recrutement',
  templateUrl: './recrutement.component.html',
  styleUrls: ['./recrutement.component.scss'],
  providers: [MessageService, DatePipe]
})
export class RecrutementComponent implements OnInit {

    recrutements: Recrutement[] = [];
    fonctions: Fonction[] = [];
    employes : Employe[] = [];
    avertissementDto : AvertissementDto = new AvertissementDto();
    submitted: boolean = false;
    productDialog: boolean = false;
    recrutement : Recrutement = new Recrutement();
    today !: string;
    deleteProductDialog: boolean = false;
    recrutementToDelete !: Recrutement;

    constructor(private recrutementService : RecrutementService, private fonctionService : FonctionService, private datePipe: DatePipe, private employeService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employeService.getAll().subscribe(data=>{
            this.employes = data;
        },err=>{
            this.router.navigate(['/']);
        })

        this.fonctionService.getAll().subscribe(data=>this.fonctions = data);

        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
        this.avertissementDto.de = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd')!;
        this.avertissementDto.jusqua = this.today;
        this.recrutement.date = this.today;

        this.recrutementService.getAll(this.avertissementDto).subscribe(data=>{
            this.recrutements = data;
            console.log(this.recrutements)
        },err=>{
            this.router.navigate(['/']);
        })
    }

    changeYear(){
        this.recrutement.demendeur = this.avertissementDto.employe;
        this.recrutementService.getAll(this.avertissementDto).subscribe(data=>{
            this.recrutements = data;
        },err=>{
            alert("Error")
        })
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.deleteProductDialog = false;
        this.recrutement = new Recrutement();
        this.recrutement.date = this.today;
        this.recrutement.demendeur = this.avertissementDto.employe;
    }

    save(){
        console.log(this.recrutement)
        this.recrutementService.save(this.recrutement).subscribe(data=>{
            this.recrutements.push(data);
            this.hideDialog();
        },err=>{
            console.log(err)
        })
    }

    delete(recrutement : Recrutement){
        this.recrutementToDelete = recrutement;
        this.deleteProductDialog = true;
    }

    confirmDelete() {
        this.recrutementService.delete(this.recrutementToDelete.id_recrutement).subscribe(data=>{
            this.deleteProductDialog = false;
            this.recrutements = this.recrutements.filter(r=>r!=this.recrutementToDelete);
        },err=>{
            alert("Error, try again")
        })
    }

}
