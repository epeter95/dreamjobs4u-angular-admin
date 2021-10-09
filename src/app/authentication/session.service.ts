import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface AccessToken {
  token: string,
  userName: string
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router){}
  getSession(){
    return localStorage.getItem('admin-token');
  }

  createSession(token: string){
    localStorage.setItem('admin-token',token);
    this.router.navigate(['/']);
  }

  clearSession(needReload: boolean){
    if(localStorage.getItem('admin-token')){
      localStorage.removeItem('admin-token');
      if(needReload){
        location.reload();
      }
    }
  }
}
