import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Employe } from 'src/app/models/employees/employe';
import { Miseapied } from 'src/app/models/miseapied/miseapied';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { MiseapiedService } from 'src/app/service/miseapied/miseapied.service';

@Component({
  selector: 'app-miseapied',
  templateUrl: './miseapied.component.html',
  styleUrls: ['./miseapied.component.scss'],
  providers: [MessageService, DatePipe]
})
export class MiseapiedComponent implements OnInit {

    misesapied: Miseapied[] = [];
    employes : Employe[] = [];
    avertissementDto : AvertissementDto = new AvertissementDto();
    submitted: boolean = false;
    productDialog: boolean = false;
    miseapied : Miseapied = new Miseapied();
    today !: string;
    deleteProductDialog: boolean = false;
    miseapiedToDelete !: Miseapied;

    constructor(private miseapiedService : MiseapiedService, private datePipe: DatePipe, private employeService : EmployesServiceService, private router : Router) { }

    ngOnInit() {

        this.employeService.getAll().subscribe(data=>{
            this.employes = data;
        },err=>{
            this.router.navigate(['/']);
        })

        this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd')!;
        this.avertissementDto.de = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), 'yyyy-MM-dd')!;
        this.avertissementDto.jusqua = this.today;
        this.miseapied.date = this.today;

        this.miseapiedService.search(this.avertissementDto).subscribe(data=>{
            this.misesapied = data;
        },err=>{
            this.router.navigate(['/']);
        })
    }

    changeYear(){
        this.miseapiedService.search(this.avertissementDto).subscribe(data=>{
            this.misesapied = data;
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

    edit(miseapied : Miseapied){
        this.miseapied = miseapied;
        this.submitted = false;
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
        this.deleteProductDialog = false;
        this.miseapied = new Miseapied();
        this.miseapied.date = this.today;
    }

    save(){
        this.miseapiedService.save(this.miseapied).subscribe(data=>{
            this.hideDialog();
            this.ngOnInit();
        },err=>{
            this.router.navigate(['/'])
        })
    }

    delete(miseapied : Miseapied){
        this.miseapiedToDelete = miseapied;
        this.deleteProductDialog = true;
    }

    confirmDelete() {
        this.miseapiedService.delete(this.miseapiedToDelete.id_miseapied).subscribe(data=>{
            this.deleteProductDialog = false;
            this.misesapied = this.misesapied.filter(av=>av!=this.miseapiedToDelete);
        },err=>{
            alert("Error, try again")
        })
    }

}
