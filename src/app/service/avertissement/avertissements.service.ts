import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Avertissements } from 'src/app/models/avertissement/avertissements';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvertissementsService {

    private url : string = environment.apiUrl + "avertissements/";

  constructor(private http : HttpClient) { }

  public search(avertissementDto : AvertissementDto):Observable<any>{
    return this.http.post(this.url+'search',avertissementDto);
  }

  public save(avertissement : Avertissements):Observable<any>{
    return this.http.post(this.url, avertissement);
  }

  public delete(id:number):Observable<any>{
    return this.http.get(this.url+id);
  }
}
