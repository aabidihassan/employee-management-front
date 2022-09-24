import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Employe } from 'src/app/models/employees/employe';
import { EmployesServiceService } from 'src/app/service/employes/employes-service.service';

@Component({
    selector: 'app-employe',
    templateUrl: './employe.component.html',
    styleUrls: ['./employe.component.scss'],
})
export class EmployeComponent implements OnInit {
    constructor(private router: Router) {}

    employe: Employe = new Employe();
    public tieredItems!: MenuItem[];

    ngOnInit(): void {
        this.employe = history.state.employe;

        if (this.employe == null) this.router.navigate(['/employes']);

        this.tieredItems = [
            {
                label: 'Coordonnées',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Personnel',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: 'personnel',
                    },
                    {
                        label: 'Contact',
                        icon: 'pi pi-fw pi-phone',
                        routerLink: 'contact',
                    },
                    {
                        label: 'Familial',
                        icon: 'pi pi-fw pi-users',
                        routerLink: 'famille',
                    },
                ],
            },
            { separator: true },
            {
                label: 'Détail RH',
                icon: 'pi pi-fw pi-server',
                items: [
                    {
                        label: 'Données',
                        icon: 'pi pi-fw pi-info-circle',
                        routerLink: 'donnees',
                    },
                    {
                        label: 'Fonction',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: 'fonction'
                    },
                ],
            },
            { separator: true },
            {
                label: 'CV',
                icon: 'pi pi-fw pi-id-card',
                items: [
                    {
                        label: 'Education',
                        icon: 'pi pi-fw pi-book',
                        routerLink: 'cv/educations',
                    },
                    {
                        label: 'Stage',
                        icon: 'pi pi-fw pi-envelope',
                        routerLink: 'cv/stages'
                    },

                    {
                        label: 'Professionnel',
                        icon: 'pi pi-fw pi-briefcase',
                        routerLink: 'cv/professionnels'
                    },
                ],
            },
            { separator: true },
            {
                label: 'Fichiers',
                icon: 'pi pi-fw pi-folder-open',
            },
            { separator: true },
            {
                label: 'Acces',
                icon: 'pi pi-fw pi-history',
            },
        ];

        localStorage.setItem('employe', JSON.stringify(this.employe));
    }

    pass(component: any) {
        component.employe = this.employe;
    }

    ngOnDestroy() {
        localStorage.removeItem('employe');
    }
}
