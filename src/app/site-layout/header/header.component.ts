import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/authentication/session.service';
import { HeaderElement } from 'src/app/interfaces/HeaderElement';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  headerElements: HeaderElement[] = [
    { icon: 'home', text: 'Kezdőlap', url: '/' },
    { icon: 'public', text: 'Publikus (statikus) tartalmak', url: '/statikus-tartalmak' },
    { icon: 'language', text: 'Nyelvek kezelése', url: '/nyelvek' },
  ]
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
