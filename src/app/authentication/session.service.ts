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

  constructor(private router: Router) { }
  //session token lekérdezése
  getSession() {
    return localStorage.getItem('admin-token');
  }
  //session token létrehozása
  createSession(token: string) {
    localStorage.setItem('admin-token', token);
    this.router.navigate(['/']);
  }
  //session token törlése, role törlése, oldal újratöltés bejelentkezés screenre navigálás
  clearSession(needReload: boolean) {
    if (localStorage.getItem('admin-token')) {
      localStorage.removeItem('admin-token');
      if (localStorage.getItem('swjbs-ur')) {
        localStorage.removeItem('swjbs-ur');
      }
      if (needReload) {
        location.reload();
      }
    }
  }
}
