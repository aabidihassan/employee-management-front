import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Demande } from 'src/app/models/conges/demande/demande';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

    private url : string = environment.apiUrl+"conges/demandes/";

    constructor(private http : HttpClient) { }

    public getAll():Observable<any>{
      return this.http.get(this.url);
    }

    public getAllByEtat(etat:string):Observable<any>{
        return this.http.get(this.url+etat);
    }

    public save(demande:Demande):Observable<any>{
        return this.http.post(this.url, demande);
    }
}
