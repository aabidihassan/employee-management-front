import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Sanction } from 'src/app/models/sanctions/sanctions/sanction';
import { SanctionService } from 'src/app/service/sanctions/sanction/sanction.service';

@Component({
  selector: 'app-sanctions',
  templateUrl: './sanctions.component.html',
  styleUrls: ['./sanctions.component.scss'],
  providers: [MessageService]
})
export class SanctionsComponent implements OnInit {

    sanctions: Sanction[] = [];
    submitted: boolean = false;
    productDialog: boolean = false;
    sanction : Sanction = new Sanction();
    deleteProductDialog: boolean = false;
    sanctionToDelete !: Sanction;
    gravites = [
        {'libelle' : 'Acceptable'},
        {'libelle' : 'Moyenne'},
        {'libelle' : 'Grave'},
    ]

    constructor(private sanctionService : SanctionService, private router : Router) { }

    ngOnInit() {

        this.sanctionService.getAll().subscribe(data=>{
            this.sanctions = data;
        },err=>{
            this.router.navigate(['/']);
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
        this.sanction = new Sanction();
    }

    save(){
        this.sanctionService.save(this.sanction).subscribe(data=>{
            this.sanctions.push(data);
            this.hideDialog();
        },err=>{
            this.router.navigate(['/'])
        })
    }

    delete(sanction : Sanction){
        this.sanctionToDelete = sanction;
        this.deleteProductDialog = true;
    }

    confirmDelete() {
        this.sanctionService.delete(this.sanctionToDelete.id_sanction).subscribe(data=>{
            this.deleteProductDialog = false;
            this.sanctions = this.sanctions.filter(sanc=>sanc!=this.sanctionToDelete);
        },err=>{
            alert("Error, try again")
        })
    }

}
