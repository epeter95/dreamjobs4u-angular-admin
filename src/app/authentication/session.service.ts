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

  constructor(){}
  getSession(){
    return localStorage.getItem('admin-token');
  }

  clearSession(){
    if(localStorage.getItem('admin-token')){
      localStorage.removeItem('admin-token');
      location.reload();
    }
  }

  logOut(){
    localStorage.removeItem('admin-token');
    location.reload();
  }
}
