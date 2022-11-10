import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Observation } from 'src/app/models/observations/observation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {

    private url : string = environment.apiUrl + "observations/";

    constructor(private http : HttpClient) { }

    public search(avertissementDto : AvertissementDto):Observable<any>{
      return this.http.post(this.url+'search',avertissementDto);
    }

    public save(observation : Observation):Observable<any>{
      return this.http.post(this.url, observation);
    }

    public delete(id:number):Observable<any>{
      return this.http.get(this.url+id);
    }
}
