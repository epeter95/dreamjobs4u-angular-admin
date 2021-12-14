import { Component, OnInit } from '@angular/core';
import { InputBase, CheckboxBase, DropdownBase, FileBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  languageOption: BaseOption = {
    name: 'Nyelvek',
    icon: 'language',
    apiUrl: '/api/languages',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'key', name: 'Nyelv kulcsa'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'flagUrl', name: 'Zászló url'},
      {id: 'active', name: 'Aktív', format: 'boolean'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a nyelvek szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokhoz szükséges nyelveket. A magyar nyelv kötelező, ez az alapnyelv az oldalon!',
    formBases: [
      new InputBase({
        key: 'key',
        label: 'Nyelv kulcsa',
        placeholder: 'pl.: hun',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a nyelvhez tartozó kulcsot'
      }),
      new InputBase({
        key: 'adminName',
        label: 'Admin felületi név',
        placeholder: 'pl.: Magyar',
        required: true,
        hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
      }),

      new FileBase({
        key: 'flagUrl',
        label: 'Zászló kép',
        required: true,
        hint: 'Kérjük töltse fel a nyelvhez tartozó zászló képét!'
      }),

      new InputBase({
        key: 'name',
        label: 'Publikus magyar nyelvű felületi név',
        placeholder: 'pl.: Magyar',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő magyar nyelvű nevet!'
      }),

      new CheckboxBase({
        key: 'active',
        label: 'Aktív',
        hint: 'Kérjük adja meg, hogy az adott nyelvhez tartozó elemek megjelennek-e az oldalon!'
      })
    ]
  }

  languageTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/languageTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'name', name: 'Publikus felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Nyelvek publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'languageElementId',
        label: 'Nyelv',
        optionsUrl: '/api/languages',
        optionKey: 'id',
        optionValue: 'adminName',
        required: true,
        hint: 'Válassza ki a nyelvet, amelyhez a fordítás tartozik!'
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
        key: 'name',
        label: 'Nyelv megjelenítendő neve',
        placeholder: 'pl.: Magyar',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      })
    ]
  }
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
