import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fonction } from 'src/app/models/fonction/fonction';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

    private url : string = environment.apiUrl + "fonctions/";

  constructor(private http : HttpClient) { }

  public save(fonction: Fonction):Observable<any>{
    return this.http.post(this.url ,fonction);
  }

  public delete(id : number):Observable<any>{
    return this.http.delete(this.url+id);
  }

  public getAll():Observable<any>{
    return this.http.get(this.url);
  }
}
