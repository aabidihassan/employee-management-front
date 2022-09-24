import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Professionnel } from 'src/app/models/champs_cv/professionnel/professionnel';
import { Employe } from 'src/app/models/employees/employe';
import { ProfessionnelService } from 'src/app/service/champs_cv/champs/professionnel/professionnel.service';

@Component({
  selector: 'app-professionnel',
  templateUrl: './professionnel.component.html',
  styleUrls: ['./professionnel.component.scss']
})
export class ProfessionnelComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);
    customers1: Professionnel[] = [];
    loading: boolean = true;

  constructor(private professionnelService : ProfessionnelService) { }

  ngOnInit(): void {

    this.professionnelService.getAllById(this.employe.id_employe).subscribe(data=>{
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