import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Customer } from 'src/app/demo/api/customer';
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
    loading: boolean = true;

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

openNew(){}

}
