import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/app/service/auth/accounts/accounts.service';
import { Token } from 'src/app/models/token/token';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

    token : Token = new Token();

  constructor(private auth : AccountsService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.token = JSON.parse(localStorage.getItem("token") || '{}');
    let req;
    if(((JSON.parse(atob(this.token.accesstoken.split('.')[1]))).exp)-(Math.floor((new Date).getTime() / 1000)) >0){
        req = request.clone({
            setHeaders:{
                Authorization : 'Bearer '+this.token.accesstoken
            }
        })
    }else{
        this.auth.refreshtoken(this.token.refreshtoken).subscribe(data=>{
            this.token = data;
            localStorage.setItem("token", JSON.stringify(this.token));
        },err=>{
            alert("Error, please try again")
        })
        req = request.clone({
            setHeaders:{
                Authorization : 'Bearer '+this.token.accesstoken
            }
        })
    }
    return next.handle(req);
  }
}
