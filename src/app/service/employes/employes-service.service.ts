import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employe } from 'src/app/models/employees/employe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployesServiceService {

  constructor(private http : HttpClient) { }

  private url : string = environment.apiUrl+"employes/";

  public getAll():Observable<any>{
    return this.http.get(this.url);
  }

  public save(employe:Employe):Observable<any>{
    return this.http.post(this.url, employe);
  }

  public delete(id:number):Observable<any>{
    return this.http.delete(this.url+id);
  }
}