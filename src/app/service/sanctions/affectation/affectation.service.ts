import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { SanctionToEmploye } from 'src/app/models/sanctions/sanctionToEmploye/sanction-to-employe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

    private url : string = environment.apiUrl+"sanctions/affectation/";

    constructor(private http : HttpClient) { }

    public save(sanction : SanctionToEmploye):Observable<any>{
      return this.http.post(this.url, sanction);
    }

    public getAll():Observable<any>{
      return this.http.get(this.url);
    }

    public delete(id : number):Observable<any>{
      return this.http.get(this.url+id);
    }

    public search(recherche : AvertissementDto):Observable<any>{
        return this.http.post(this.url+"search", recherche);
    }
}
