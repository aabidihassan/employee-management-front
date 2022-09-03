import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Employe } from 'src/app/models/employees/employe';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})

export class EmployeComponent implements OnInit {

  constructor(private activate : ActivatedRoute, private employeService : EmployesServiceService) { }

  employe : Employe = new Employe();
  public tieredItems!: MenuItem[];

  ngOnInit(): void {

    this.tieredItems = [
        {
            label: 'Employé',
            icon: 'pi pi-fw pi-user',
            items: [
                {
                    label: 'Coordonnées',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        {
                            label: 'Personnel',
                            icon: 'pi pi-fw pi-plus'
                        },
                        {
                            label: 'Contact',
                            icon: 'pi pi-fw pi-copy'
                        },
                        {
                            label: 'Familial',
                            icon: 'pi pi-fw pi-copy'
                        },

                    ]
                },
            ]
        },
        { separator: true },
        {
            label: 'Détail RH',
            icon: 'pi pi-fw pi-server',
            items: [
                {
                    label: 'Données',
                    icon: 'pi pi-fw pi-plus'
                },
                {
                    label: 'Fonction',
                    icon: 'pi pi-fw pi-copy'
                },

            ]
        },
        { separator: true },
        {
            label: 'Fichiers',
            icon: 'pi pi-fw pi-folder-open',
        },
        { separator: true },
        {
            label: 'Congé',
            icon: 'pi pi-fw pi-sign-out',
        },
    ];

    this.activate.params.subscribe(data=>{
        this.employeService.getById(data['id']).subscribe(data=>{
            this.employe = data;
            console.log(this.employe)
        },err=>{

        })
    })



  }

}
