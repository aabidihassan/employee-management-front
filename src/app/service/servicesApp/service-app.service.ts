import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/models/services/service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceAppService {

    private url = environment.apiUrl+"services/"

  constructor(private http: HttpClient) { }

  public getAll():Observable<any>{
    return this.http.get(this.url);
  }

  public getEmployesByService(id:number):Observable<any>{
    return this.http.get(this.url+"service/"+id);
  }

  public save(service: Service):Observable<any>{
    return this.http.post(this.url, service);
  }

  public delete(id : number):Observable<any>{
    return this.http.delete(this.url+id);
  }
}
