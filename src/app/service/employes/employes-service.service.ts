import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeDto } from 'src/app/dto/Employe/employe-dto';
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

  public save(employe:FormData):Observable<any>{
    return this.http.post(this.url, employe);
  }

  public delete(id:number):Observable<any>{
    return this.http.get(this.url+id);
  }

  public getById(id:number):Observable<any>{
    return this.http.get(this.url+id);
  }

  public edit(employe:Employe):Observable<any>{
    return this.http.post(this.url+"edit", employe);
  }
}
