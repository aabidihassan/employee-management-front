import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Questionnaire } from 'src/app/models/enquettes/questionnaire/questionnaire';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
    private url : string = environment.apiUrl + "enquettes/";

    constructor(private http : HttpClient) { }

    public save(enquette : Questionnaire):Observable<any>{
      return this.http.post(this.url, enquette);
    }

    public getAll():Observable<any>{
      return this.http.get(this.url);
    }
}
