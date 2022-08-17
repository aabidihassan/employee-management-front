import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployesServiceService {

  constructor(private http : HttpClient) { }

  public users():Observable<any>{
    return this.http.get(environment.apiUrl+"users/");
  }
}
