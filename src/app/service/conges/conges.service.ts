import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CongesService {

    private url : string = environment.apiUrl+"conges/";

  constructor(private http : HttpClient) { }

  public getAllByYear(year:number):Observable<any>{
    return this.http.get(this.url+year);
  }
}
