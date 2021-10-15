import { Component, OnInit } from '@angular/core';
import { DropdownBase, InputBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roleOption: BaseOption = {
    name: 'Felhasználói Szerepkörök',
    icon: 'group',
    disableCreatePanel: true,
    apiUrl: '/api/roles',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'key', name: 'Szerepkör kulcsa'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a felhasználói szerepkörök szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő felhasználói szerepköröket, és fordításait. A magyar nyelvű fordítás felvétele kötelező!',
    formBases: [

      new InputBase({
        key: 'key',
        label: 'Szerepkör kulcsa',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a szerepkörhöz tartozó kulcsot!'
      }),

      new InputBase({
        key: 'adminName',
        label: 'Admin felületi név',
        placeholder: 'pl.: Munkaválllaló',
        required: true,
        hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
      })
      
    ]
  };

  roleTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/roleTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'Role', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'name', name: 'Publikus felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Publikus (statikus) tartalmak publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'roleId',
        label: 'Szerepkör',
        optionsUrl: '/api/roles',
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
        key: 'name',
        label: 'Szerepkör neve',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      })
    ]
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
