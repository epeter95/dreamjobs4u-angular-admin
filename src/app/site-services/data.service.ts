import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../authentication/session.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private sessionService: SessionService) {}
  private drowDownSubject: Subject<string> = new BehaviorSubject<string>('refresh');
  drowDownObservable$ = this.drowDownSubject.asObservable();
  setNextText(text: string){
    this.drowDownSubject.next(text);
  }

  getAllData(url: string): Observable<any[]>{
    return this.http.get<any[]>(environment.apiDomain+url,{
      observe: 'body',
      headers: this.getAuthHeader()
    });
  }

  getOneData(url: string,id: string): Observable<any>{
    return this.http.get<any>(environment.apiDomain+url+'/'+id,{
      observe: 'body',
      headers: this.getAuthHeader()
    });
  }

  postData(url: string, data: any): Observable<any>{ 
    return this.http.post(environment.apiDomain+url, data,{
      headers: this.getAuthHeader()
    });
  }

  putData(url: string,id: string, data: any): Observable<any>{
    return this.http.put(environment.apiDomain+url+'/'+id, data,{
      headers: this.getAuthHeader()
    });
  }

  deleteData(url: string,id: string): Observable<any>{
    return this.http.delete(environment.apiDomain+url+'/'+id,{
      headers: this.getAuthHeader()
    });
  }

  getAuthHeader(){
    return new HttpHeaders().set("Authorization", 'Bearer ' + this.sessionService.getSession());
  }
}
