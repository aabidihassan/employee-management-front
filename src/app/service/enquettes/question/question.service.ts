import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/enquettes/question/question';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

    private url : string = environment.apiUrl + "questions/";

    constructor(private http : HttpClient) { }

    public save(question : Question):Observable<any>{
      return this.http.post(this.url, question);
    }

    public getAll():Observable<any>{
      return this.http.get(this.url);
    }

}
