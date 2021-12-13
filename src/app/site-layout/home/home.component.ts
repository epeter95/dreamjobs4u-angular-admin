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
      title: 'Állások',
      description: 'Itt az oldalon megjelenítendő állásokhoz tartozó információkat lehet szerkeszteni.',
      url: '/allasok'
    },
    {
      title: 'Kategóriák',
      description: 'Itt az oldalon megjelenítendő kategóriákhoz tartozó információkat lehet szerkeszteni.',
      url: '/kategoriak'
    },
    {
      title: 'Nyelvek',
      description: 'Itt az oldalon megjelenő nyelveket képes szerkeszteni.',
      url: '/nyelvek'
    },
    {
      title: 'Rendszer üzenetek',
      description: 'Itt az oldal altál küldött sikeres üzenetek, dialógus ablak elemek fordításait lehet módosítani.',
      url: '/rendszeruzenetek'
    },
    {
      title: 'Hiba üzenetek',
      description: 'Itt az oldal altál küldött hiba üzenetek, dialógus ablak elemek fordításait lehet módosítani.',
      url: '/hibauzenetek'
    },
    {
      title: 'Felhasználó státuszok',
      description: 'Itt az állásra jelentkezett felhasználók státuszát lehet állítani.',
      url: '/statuszok'
    },
    {
      title: 'Állásra jelentkezett felhasználók',
      description: 'Itt az állásra jelentkezett felhasználókat lehet módosítani.',
      url: '/jelentkezett-felhasznalok'
    },
    {
      title: 'Események',
      description: 'Itt az felhasználókhoz tartozó eseményeket lehet módosítani.',
      url: '/esemenyek'
    },
    
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
