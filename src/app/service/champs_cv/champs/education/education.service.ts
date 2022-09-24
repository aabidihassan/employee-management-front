import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Education } from 'src/app/models/champs_cv/education/education';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

    private url : string = environment.apiUrl+"educations/";

  constructor(private http : HttpClient) { }

  public save(education : Education):Observable<any>{
    return this.http.post(this.url, education);
  }

  public getAllById(id : number):Observable<any>{
    return this.http.get(this.url+id);
  }
}
