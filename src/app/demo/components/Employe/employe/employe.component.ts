import { Component, Input, OnInit } from '@angular/core';
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

    this.employe = history.state.employe

    console.log(this.employe)

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
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: 'personnel'
                        },
                        {
                            label: 'Contact',
                            icon: 'pi pi-fw pi-phone',
                            routerLink: 'contact'
                        },
                        {
                            label: 'Familial',
                            icon: 'pi pi-fw pi-users',
                            routerLink: 'famille'
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
                    icon: 'pi pi-fw pi-info-circle',
                    routerLink: 'donnees'
                },
                {
                    label: 'Fonction',
                    icon: 'pi pi-fw pi-shopping-bag'
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
        { separator: true },
        {
            label: 'Acces',
            icon: 'pi pi-fw pi-history',
        },
    ];

    localStorage.setItem('employe', JSON.stringify(this.employe))

  }

  pass(component:any){
    component.employe = this.employe;
  }

  ngOnDestroy(){
    localStorage.removeItem('employe')
  }

}
