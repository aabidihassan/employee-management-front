import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

    private url : string = environment.apiUrl+"annees/";

  constructor(private http : HttpClient) { }

  public getAll():Observable<any>{
    return this.http.get(this.url);
  }
}
