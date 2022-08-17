import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/models/utilisateur/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

    private httpClient: HttpClient;

  constructor(handler : HttpBackend) {
    this.httpClient = new HttpClient(handler);
   }

  public login(user : Utilisateur):Observable<any>{
    this.logout();
    return this.httpClient.post('http://localhost:8080/login', user);
  }

  public logout(){
    localStorage.clear();
  }

  public refreshtoken(refreshToken:String):Observable<any>{
    return this.httpClient.get("http://localhost:8080/api/token/refreshToken",
      {headers : new HttpHeaders({
          'Authorization' : "Bearer "+refreshToken
      })});
  }
}
