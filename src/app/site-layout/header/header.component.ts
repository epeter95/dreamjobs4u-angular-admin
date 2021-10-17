import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/authentication/session.service';
import { HeaderElement, NestedHeaderElement } from 'src/app/interfaces/HeaderElement';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  publicContentMenuElements: NestedHeaderElement[] = [
    {text: 'Fejléc', url: '/publikus-tartalmak/header'},
    {text: 'Lábléc', url: '/publikus-tartalmak/footer'},
    {text: 'Regisztráció', url: '/publikus-tartalmak/registration'}
  ];
  headerElements: HeaderElement[] = [
    { icon: 'home', text: 'Kezdőlap', url: '/' },
    { icon: 'public', text: 'Publikus (statikus) tartalmak', url: '/publikus-tartalmak', nested: true, nestedElements: this.publicContentMenuElements },
    { icon: 'language', text: 'Nyelvek kezelése', url: '/nyelvek' },
    { icon: 'supervised_user_circle', text: 'Felhasználók', url: '/felhasznalok' },
    { icon: 'group', text: 'Felhasználói szerepkörök', url: '/szerepkorok' },
    { icon: 'message', text: 'Rendszerüzenetek', url: '/rendszeruzenetek' },
    { icon: 'warning', text: 'Hibaüzenetek', url: '/hibauzenetek' }
  ];
  headerTitle: string = 'Dreamjobs 4 you admin felület';
  activeName: string = 'Kezdőlap';
  routerEventSubscriptions: Subscription = new Subscription();

  constructor(private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.routerEventSubscriptions = this.router.events.subscribe(e => {
      if (e instanceof RouterEvent) {
        let element = this.headerElements.find(element => element.url == e.url);
        element ? this.activeName = element.text : this.activeName = 'Home';
      }
    });
  }

  ngOnDestroy() {
    this.routerEventSubscriptions.unsubscribe();
    this.sessionService.clearSession(false);
  }

  logOut() {
    this.sessionService.clearSession(true);
  }

}
