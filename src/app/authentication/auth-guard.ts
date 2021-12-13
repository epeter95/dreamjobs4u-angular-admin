import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }
  //session ellenőrzése route gyerekeknél, egyébként redirect login screenre
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    return this.canActivate(route, state);
  }
  //session ellenőrzése, egyébként redirect login screenre
  checkLogin(url: string): true | UrlTree {
    if (!this.sessionService.getSession()) {
      this.router.navigate(['/bejelentkezes']);
    }
    return true;
  }
}