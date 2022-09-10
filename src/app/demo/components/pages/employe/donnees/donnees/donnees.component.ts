import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employees/employe';
import { Details } from 'src/app/models/rh/details/details';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
  selector: 'app-donnees',
  templateUrl: './donnees.component.html',
  styleUrls: ['./donnees.component.scss']
})
export class DonneesComponent implements OnInit {

    public employe : Employe = JSON.parse(localStorage.getItem('employe')!);

    contrats = [
        'CDD',
        'CDI',
        'ANAPEC',
        'FREELANCE'
    ]

  constructor(private employeService : EmployesServiceService) { }

  ngOnInit(): void {
    if(this.employe.detailsRH==null) this.employe.detailsRH = new Details();
  }

  save(){
    this.employeService.edit(this.employe).subscribe(data=>{
        this.employe=data;
        localStorage.setItem('employe', JSON.stringify(this.employe))
        console.log(this.employe)
        alert("Les informations bien enregistre")
    },err=>{
        alert("Erroor")
    })
  }

}
