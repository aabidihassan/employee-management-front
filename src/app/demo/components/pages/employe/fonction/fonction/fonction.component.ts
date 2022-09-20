import { Component, OnInit } from '@angular/core';
import { Employe } from 'src/app/models/employees/employe';
import { Fonction } from 'src/app/models/fonction/fonction';
import { Service } from 'src/app/models/services/service';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';
import { ServiceAppService } from 'src/app/service/servicesApp/service-app.service';

@Component({
  selector: 'app-fonction',
  templateUrl: './fonction.component.html',
  styleUrls: ['./fonction.component.scss']
})
export class FonctionComponent implements OnInit {

    employe:Employe = JSON.parse(localStorage.getItem('employe')!);

    services: Service[] = [];

    service : Service = this.employe.fonction!=null ? this.employe.fonction.service : new Service();

    fonctions: Fonction[] = [];

    fonc !: Service;

  constructor(private employeService : EmployesServiceService, private serviceApp: ServiceAppService) { }

  ngOnInit(): void {

    this.serviceApp.getAll().subscribe(data=>{
        this.services = data;
        if(this.employe.fonction != null){
            this.fonc = this.services.find(fonction => fonction.id_service === this.employe.fonction.service.id_service)!;
            console.log(this.fonc)
            this.fonctions = this.fonc.fonctions;
        }
    },err=>{
        this.ngOnInit();
        //this.router.navigate(['/']);
    })

  }

  change(){
    this.fonctions = this.service.fonctions;
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
