import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
import { Product } from 'src/app/demo/api/product';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Education } from 'src/app/models/champs_cv/education/education';
import { Employe } from 'src/app/models/employees/employe';
import { EducationService } from 'src/app/service/champs_cv/champs/education/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    customers1: Education[] = [];
    education : Education = new Education();
    submitted: boolean = false;
    productDialog: boolean = false;
  constructor(private educationService : EducationService) { }

  ngOnInit(): void {

    this.educationService.getAllById(this.employe.id_employe).subscribe(data=>{
        this.customers1 = data;
    },err=>{
        alert("Error")
    })
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

openNew(){
    this.education = new Education();
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

save(){
    this.submitted = true;
    this.education.employe = this.employe;
    this.educationService.save(this.education).subscribe(data=>{
        this.productDialog = false;
        this.education = new Education();
        this.ngOnInit();
    },err=>{
        alert("Error, try again")
    })
}

}
