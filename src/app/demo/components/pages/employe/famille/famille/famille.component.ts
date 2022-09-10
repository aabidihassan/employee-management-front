import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employees/employe';
import { Famille } from 'src/app/models/famille/famille';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
  selector: 'app-famille',
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.scss']
})
export class FamilleComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);

    bool!:boolean;

    situation = [
        { label: 'Célibataire', value: 'C' },
        { label: 'Marié', value: 'M' },
        { label: 'Divorcé', value: 'D' }
    ];

  constructor(private employeService : EmployesServiceService) { }

  ngOnInit(): void {
    if(this.employe.famille==null){
        this.employe.famille = new Famille();
    }
    this.bool = this.employe.famille.situation == 'C' ? true : false;
  }

  change(){
    if(this.employe.famille.situation == 'C'){
        this.employe.famille = new Famille();
        this.bool = true;
    }else{
        this.bool = false;
    }
  }

  save(){
    console.log(this.employe)
    this.employeService.edit(this.employe).subscribe(data=>{
        alert("Les informations bien enregistre")
        this.employe=data;
        localStorage.setItem('employe', JSON.stringify(this.employe))
    },err=>{
        alert("Erroor")
    })
  }

}
