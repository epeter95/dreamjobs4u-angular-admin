import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface FileData {
  key: string,
  file: File
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  //file observable létrehozása fájlok kezelésére
  private fileSubject: Subject<FileData> = new Subject<FileData>();
  fileObservable$ = this.fileSubject.asObservable();
  constructor() { }

  nextFile(file: FileData) {
    this.fileSubject.next(file);
  }
}
