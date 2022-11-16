import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Employe } from 'src/app/models/employees/employe';
import { Sanction } from 'src/app/models/sanctions/sanctions/sanction';
import { SanctionToEmploye } from 'src/app/models/sanctions/sanctionToEmploye/sanction-to-employe';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { AffectationService } from 'src/app/service/sanctions/affectation/affectation.service';
import { SanctionService } from 'src/app/service/sanctions/sanction/sanction.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss'],
  providers: [MessageService, DatePipe]
})
export class AffectationComponent implements OnInit {

    sanctions: SanctionToEmploye[] = [];
    employes : Employe[] = [];
    avertissementDto : AvertissementDto = new AvertissementDto();
    submitted: boolean = false;
    productDialog: boolean = false;
    sanction : SanctionToEmploye = new SanctionToEmploye();
    today !: string;
    deleteProductDialog: boolean = false;
    sanctionToDelete !: SanctionToEmploye;
    sanctionsLibelles : Sanction[] = [];

    constructor(private sanctionService : AffectationService, private sanctionServ : SanctionService, private datePipe: DatePipe, private employeService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employeService.getAll().subscribe(data=>{
            this.employes = data;
        },err=>{
            this.router.navigate(['/']);
        })

        this.sanctionServ.getAll().subscribe(data=>{
            this.sanctionsLibelles = data;
        },err=>{
            this.router.navigate(['/']);
        })

        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
        this.avertissementDto.de = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd')!;
        this.avertissementDto.jusqua = this.today;
        this.sanction.date = this.today;

        this.sanctionService.search(this.avertissementDto).subscribe(data=>{
            this.sanctions = data;
        },err=>{
            this.router.navigate(['/']);
        })
    }

    changeSearch(){
        this.sanction.employe = this.avertissementDto.employe;
        this.sanctionService.search(this.avertissementDto).subscribe(data=>{
            this.sanctions = data;
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
        this.sanction = new SanctionToEmploye();
        this.sanction.date = this.today;
        this.sanction.employe = this.avertissementDto.employe;
    }

    save(){
        this.sanctionService.save(this.sanction).subscribe(data=>{
            this.sanctions.push(data);
            this.hideDialog();
        },err=>{
            this.router.navigate(['/'])
        })
    }

    delete(sanction : SanctionToEmploye){
        this.sanctionToDelete = sanction;
        this.deleteProductDialog = true;
    }

    confirmDelete() {
        this.sanctionService.delete(this.sanctionToDelete.id_affectation).subscribe(data=>{
            this.deleteProductDialog = false;
            this.sanctions = this.sanctions.filter(av=>av!=this.sanctionToDelete);
        },err=>{
            alert("Error, try again")
        })
    }

}
