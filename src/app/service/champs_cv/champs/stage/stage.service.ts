import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stage } from 'src/app/models/champs_cv/stage/stage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageService {

    private url : string = environment.apiUrl+"stages/";

    constructor(private http : HttpClient) { }

    public save(stage : Stage):Observable<any>{
      return this.http.post(this.url, stage);
    }

    public getAllById(id : number):Observable<any>{
      return this.http.get(this.url+id);
    }
}
