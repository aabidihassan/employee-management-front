import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employees/employe';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);

  constructor(private employeService : EmployesServiceService) { }

  ngOnInit(): void {
  }

  save(){
    this.employeService.edit(this.employe).subscribe(data=>{
        this.employe=data;
        localStorage.setItem('employe', JSON.stringify(this.employe))
        alert("Les informations bien enregistre")
    },err=>{
        alert("Erroor")
    })
  }

}
