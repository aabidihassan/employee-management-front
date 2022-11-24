import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Miseapied } from 'src/app/models/miseapied/miseapied';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiseapiedService {

    private url : string = environment.apiUrl + "miseapieds/";

    constructor(private http : HttpClient) { }

    public search(avertissementDto : AvertissementDto):Observable<any>{
      return this.http.post(this.url+'search',avertissementDto);
    }

    public save(miseapied : Miseapied):Observable<any>{
      return this.http.post(this.url, miseapied);
    }

    public delete(id:number):Observable<any>{
      return this.http.get(this.url+id);
    }
}
