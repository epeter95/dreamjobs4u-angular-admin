import { Component, OnInit } from '@angular/core';
import { InputBase, DropdownBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-general-messages',
  templateUrl: './general-messages.component.html',
  styleUrls: ['./general-messages.component.scss']
})
export class GeneralMessagesComponent implements OnInit {

  generalMessageOption: BaseOption = {
    name: 'Rendszerüzenetek',
    icon: 'message',
    disableCreatePanel: true,
    apiUrl: '/api/generalMessages',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'key', name: 'Rendszerüzenet kulcsa'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modify', name:'', format: 'modify'}
    ],
    title: 'Üdvözöljük a Rendszerüzenetek szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő Rendszerüzeneteket, és fordításait. A magyar nyelvű fordítás felvétele kötelező!',
    formBases: [

      new InputBase({
        key: 'key',
        label: 'Rendszerüzenet kulcsa',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a Rendszerüzenethez tartozó kulcsot!'
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

  generalMessageTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/generalMessageTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'GeneralMessage', name: 'Rendszerüzenet', searchAttribute: 'adminName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'text', name: 'Üzenet tartalma'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Rendszerüzenetek publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'generalMessageId',
        label: 'Rendszerüzenet',
        optionsUrl: '/api/generalMessages',
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
