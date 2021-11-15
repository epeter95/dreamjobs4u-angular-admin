import { Component, OnInit } from '@angular/core';
import { InputBase, DropdownBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-applied-user-statuses',
  templateUrl: './applied-user-statuses.component.html',
  styleUrls: ['./applied-user-statuses.component.scss']
})
export class AppliedUserStatusesComponent implements OnInit {

  appliedUserStatusesOption: BaseOption = {
    name: 'Hibaüzenetek',
    icon: 'layers',
    disableCreatePanel: true,
    apiUrl: '/api/appliedUserStatuses',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'key', name: 'Státusz kulcsa'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a Felhasználói státuszok szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalohoz tartozó Felhasználói státuszokat, és fordításait. A magyar nyelvű fordítás felvétele kötelező!',
    formBases: [

      new InputBase({
        key: 'key',
        label: 'Státusz kulcsa',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a státusz tartozó kulcsot!'
      }),

      new InputBase({
        key: 'adminName',
        label: 'Admin felületi név',
        required: true,
        hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'text',
        label: 'Státusz neve',
        neededToModifyForm: 'false',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő tartalmat!'
      })
      
    ]
  };

  appliedUserStatusesTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/appliedUserStatusTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'AppliedUserStatus', name: 'Státusz', searchAttribute: 'adminName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'text', name: 'Státusz neve'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Hibaüzenetek publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'appliedUserStatusId',
        label: 'Státusz',
        optionsUrl: '/api/appliedUserStatuses',
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
        label: 'Státsz neve',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő tartalmat!'
      })
    ]
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
