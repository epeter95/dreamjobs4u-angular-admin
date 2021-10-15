import { Component, OnInit } from '@angular/core';
import { DropdownBase, InputBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-public-contents',
  templateUrl: './public-contents.component.html',
  styleUrls: ['./public-contents.component.scss']
})
export class PublicContentsComponent implements OnInit {

  publicContentOption: BaseOption = {
    name: 'Publikus (statikus) tartalmak',
    icon: 'public',
    disableCreatePanel: true,
    apiUrl: '/api/publicContents',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'link', name: 'Tartalom linkje ( ha van )'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a publikus (statikus) tartalmak szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő statikus elemeket, és a hozzájuk szükséges fordításokat. A magyar nyelv kötelező, ez az alapnyelv az oldalon!',
    formBases: [
      new InputBase({
        key: 'adminName',
        label: 'Admin felületi név',
        placeholder: 'pl.: Magyar',
        required: true,
        hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'link',
        label: 'Tartalom linkje ( ha szükséges',
        placeholder: 'pl.: https://google.com',
        hint: 'Kérjük adja meg a publikus tartalomhoz tartozó linket!'
      }),

      new InputBase({
        key: 'title',
        label: 'Tartalom publikus felületen magyar nyelven megjelenítendő neve/címe',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő magyar nyelvű nevet/címet!'
      })
    ]
  }

  publicContentTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/publicContentTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'PublicContent', name: 'Publikus tartalom', searchAttribute: 'adminName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'title', name: 'Publikus felületi név/cím'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Publikus (statikus) tartalmak publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'publicContentId',
        label: 'Nyelv',
        optionsUrl: '/api/publicContents',
        optionKey: 'id',
        optionValue: 'adminName',
        required: true,
        hint: 'Válassza ki a tartalmat, amelyhez a fordítás tartozik!'
      },this.dataService),

      new DropdownBase({
        key: 'languageId',
        label: 'Fordítási nyelv',
        optionsUrl: '/api/languages',
        optionKey: 'id',
        optionValue: 'adminName',
        required: true,
        hint: 'Válassza ki a fordítási nyelvet!'
      },this.dataService),

      new InputBase({
        key: 'title',
        label: 'Tartalom neve/címe',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet/címet!'
      })
    ]
  }
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
