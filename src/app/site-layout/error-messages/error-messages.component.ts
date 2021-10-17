import { Component, OnInit } from '@angular/core';
import { InputBase, DropdownBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss']
})
export class ErrorMessagesComponent implements OnInit {

  errorMessageOption: BaseOption = {
    name: 'Hibaüzenetek',
    icon: 'warning',
    disableCreatePanel: true,
    apiUrl: '/api/errorMessages',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'key', name: 'Hibaüzenetek kulcsa'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a Hibaüzenetek szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő Hibaüzeneteket, és fordításait. A magyar nyelvű fordítás felvétele kötelező!',
    formBases: [

      new InputBase({
        key: 'key',
        label: 'Hibaüzenet kulcsa',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a hibaüzenethez tartozó kulcsot!'
      }),

      new InputBase({
        key: 'adminName',
        label: 'Admin felületi név',
        required: true,
        hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'text',
        label: 'Üzenet tartalma',
        neededToModifyForm: 'false',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő tartalmat!'
      })
      
    ]
  };

  errorMessageTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/errorMessageTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'ErrorMessage', name: 'Hibaüzenet', searchAttribute: 'adminName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'text', name: 'Üzenet tartalma'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Hibaüzenetek publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'errorMessageId',
        label: 'Hibaüzenet',
        optionsUrl: '/api/errorMessages',
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
        key: 'text',
        label: 'Üzenet tartalma',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő tartalmat!'
      })
    ]
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
