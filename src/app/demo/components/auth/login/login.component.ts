import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Token } from 'src/app/models/token/token';
import { Utilisateur } from 'src/app/models/utilisateur/utilisateur';
import { AccountsService } from 'src/app/service/auth/accounts/accounts.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
            margin-bottom:5%;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    user : Utilisateur = new Utilisateur();
    token : Token = new Token();

    constructor(public layoutService: LayoutService, private authService : AccountsService, private router : Router) { }

    ngOnInit() {
        if(localStorage.getItem("token")!=null){
            this.router.navigate(['/']);
        }
    }

    login(){
        this.authService.login(this.user).subscribe(data=>{
            this.token = data;
            this.router.navigate(['/'])
        },err=>{
            alert("Les informations sont incorrects")
        })
    }
}
