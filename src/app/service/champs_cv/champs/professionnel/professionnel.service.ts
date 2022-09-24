import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professionnel } from 'src/app/models/champs_cv/professionnel/professionnel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessionnelService {

    private url : string = environment.apiUrl+"professionnels/";

    constructor(private http : HttpClient) { }

    public save(professionnel : Professionnel):Observable<any>{
      return this.http.post(this.url, professionnel);
    }

    public getAllById(id : number):Observable<any>{
      return this.http.get(this.url+id);
    }
}
