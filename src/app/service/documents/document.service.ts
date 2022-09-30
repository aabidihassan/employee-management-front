import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

    private url : string = environment.apiUrl+"documents/";

  constructor(private http : HttpClient) { }

  public save(formData : FormData, id: number):Observable<any>{
    return this.http.post(this.url + id, formData);
  }

  public download(path : string):Observable<any>{
    return this.http.get(this.url + path, {
        reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  public delete(id:number):Observable<any>{
    return this.http.get(this.url+id);
  }
}
