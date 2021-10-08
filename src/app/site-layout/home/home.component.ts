import { Component, OnInit } from '@angular/core';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { HomeElement } from 'src/app/interfaces/HomeElements';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeOption: BaseOption = {
    name: 'Kezdőlap',
    title: 'Üdvözlünk a Dream jobs 4 you admin felületén',
    subtitle: 'Itt van lehetősége a weboldalon megjelenő elemek létrehozására, szerkesztésére, esetleges felhasználókkal kapcsolatos hibák javítására.',
    icon: 'sentiment_satisfied_alt'
  };
  homeElements: HomeElement[] = [
    {
      title: 'Publikus (statikus) tartalmak',
      description: 'Itt az oldalon megjelenő statikus elemek létrehozására, módosítására, és törlésére van lehetősége, mint például a navigációs bár elemei, a láblécben és fejlécben megjelenő elemek...',
      url: '/publikus-tartalmak'
    },
    {
      title: 'Nyelvek',
      description: 'Itt az oldalon megjelenítendő fordításokhoz szükséges nyelveket tudja létrehozni, módosítani, illetve törölni.',
      url: '/nyelvek'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
