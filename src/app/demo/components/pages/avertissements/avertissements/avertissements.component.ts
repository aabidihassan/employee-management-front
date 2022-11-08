import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Avertissements } from 'src/app/models/avertissement/avertissements';
import { Employe } from 'src/app/models/employees/employe';
import { AvertissementsService } from 'src/app/service/avertissement/avertissements.service';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
  selector: 'app-avertissements',
  templateUrl: './avertissements.component.html',
  styleUrls: ['./avertissements.component.scss'],
  providers: [MessageService, DatePipe]
})
export class AvertissementsComponent implements OnInit {

    avertissements: Avertissements[] = [];
    employes : Employe[] = [];
    avertissementDto : AvertissementDto = new AvertissementDto();
    submitted: boolean = false;
    productDialog: boolean = false;
    avertissement : Avertissements = new Avertissements();
    today !: string;
    deleteProductDialog: boolean = false;
    avertissementToDelete !: Avertissements;

    constructor(private avertissementService : AvertissementsService, private datePipe: DatePipe, private employeService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employeService.getAll().subscribe(data=>{
            this.employes = data;
        },err=>{
            this.router.navigate(['/']);
        })

        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
        this.avertissementDto.de = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd')!;
        this.avertissementDto.jusqua = this.today;
        this.avertissement.date = this.today;

        this.avertissementService.search(this.avertissementDto).subscribe(data=>{
            this.avertissements = data;
        },err=>{
            this.router.navigate(['/']);
        })
    }

    changeYear(){
        this.avertissement.employe = this.avertissementDto.employe;
        this.avertissementService.search(this.avertissementDto).subscribe(data=>{
            this.avertissements = data;
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
        this.avertissement = new Avertissements();
        this.avertissement.date = this.today;
        this.avertissement.employe = this.avertissementDto.employe;
    }

    save(){
        console.log(this.avertissement)
        this.avertissementService.save(this.avertissement).subscribe(data=>{
            this.avertissements.push(data);
            this.hideDialog();
        },err=>{
            this.router.navigate(['/'])
        })
    }

    delete(avertissement : Avertissements){
        this.avertissementToDelete = avertissement;
        this.deleteProductDialog = true;
    }

    confirmDelete() {
        this.avertissementService.delete(this.avertissementToDelete.id_avertissement).subscribe(data=>{
            this.deleteProductDialog = false;
            this.avertissements = this.avertissements.filter(av=>av!=this.avertissementToDelete);
        },err=>{
            alert("Error, try again")
        })
    }

}
