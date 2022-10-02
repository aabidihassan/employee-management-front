import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employees/employe';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {

    public employe : Employe = JSON.parse(localStorage.getItem('employe')!)

    paymentOptions: any[] = [];


  constructor(private employeService : EmployesServiceService) { }

  ngOnInit(): void {
    this.paymentOptions = [
        { libelle: 'ADMIN'},
        { libelle: 'SUPERUSER'},
        { libelle: 'USER'}
    ];
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
