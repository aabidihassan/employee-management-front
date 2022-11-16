import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sanction } from 'src/app/models/sanctions/sanctions/sanction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SanctionService {

    private url : string = environment.apiUrl+"sanctions/";

  constructor(private http : HttpClient) { }

  public save(sanction : Sanction):Observable<any>{
    return this.http.post(this.url, sanction);
  }

  public getAll():Observable<any>{
    return this.http.get(this.url);
  }

  public delete(id : number):Observable<any>{
    return this.http.get(this.url+id);
  }
}
