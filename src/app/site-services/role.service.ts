import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() {}

  getRole(){
    return localStorage.getItem('swjbs-ur');
  }

  nextRole(role: string){
    this.setRole(role);
  }

  setRole(role: string){
    localStorage.setItem('swjbs-ur',role);
  }

  clearRole(){
    this.nextRole('');
    localStorage.removeItem('swjbs-ur');
  }

  initUserRole(){
    return this.getRole() ? this.getRole() : '';
  }

  checkSuperadmin(role: string){
    if(environment.superAdminRole == role){
      return true;
    }
    return false;
  }
}
