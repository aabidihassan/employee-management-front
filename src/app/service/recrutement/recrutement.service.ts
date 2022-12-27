import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AvertissementDto } from 'src/app/dto/avertissement/avertissement-dto';
import { Recrutement } from 'src/app/models/recrutement/recrutement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecrutementService {

    private url : string = environment.apiUrl + "recrutement/";

    constructor(private http : HttpClient) { }

    public save(recrutement : Recrutement):Observable<any>{
        return this.http.post(this.url, recrutement);
    }

    public getAll(avertissementDto : AvertissementDto):Observable<any>{
        return this.http.post(this.url + 'search', avertissementDto);
    }

    public accept(id : number):Observable<any>{
        return this.http.get(this.url + 'accept' + id);
    }

    public delete(id : number):Observable<any>{
        return this.http.get(this.url + id);
    }

    public decline(id : number):Observable<any>{
        return this.http.get(this.url + 'decline' + id);
    }

}
