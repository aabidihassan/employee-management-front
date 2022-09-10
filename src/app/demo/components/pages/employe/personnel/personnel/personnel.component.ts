import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employe } from 'src/app/models/employees/employe';
import { Statut } from 'src/app/models/statut/statut';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { StatutService } from 'src/app/service/statut/statut.service';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

    public employe : Employe = new Employe();

    sex = [
        { name: 'Masculin', code: 'M' },
        { name: 'Féminin', code: 'F' }
    ];

    statuts: Statut[] = [];

  constructor(private statutService : StatutService, private employeService : EmployesServiceService) { }

  ngOnInit(): void {
    this.employe = JSON.parse(localStorage.getItem('employe')!)
    this.statutService.getAll().subscribe(data=>{
        this.statuts = data;
    },err=>{
        this.ngOnInit();
    })
  }

  save(){
    this.employeService.edit(this.employe).subscribe(data=>{
        alert("Les informations bien enregistre")
        this.employe=data;
        localStorage.setItem('employe', JSON.stringify(this.employe))
    },err=>{
        alert("Erroor")
    })
  }

}
