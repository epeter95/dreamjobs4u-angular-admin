import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
//tábla újratöltéshez szükséges observable
@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tableSubject: Subject<string> = new Subject<string>();
  tableObservable$ = this.tableSubject.asObservable();
  constructor() { }

  setNextText(text: string){
    this.tableSubject.next(text);
  }
}
