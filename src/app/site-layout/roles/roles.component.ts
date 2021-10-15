import { Component, OnInit } from '@angular/core';
import { InputBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';

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
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő felhasználói szerepköröket.',
    formBases: [

      new InputBase({
        key: 'key',
        label: 'Szerepkör kulcsa',
        required: true,
        hint: 'Kérjük adja meg a szerepkörhöz tartozó kulcsot!'
      }),

      new InputBase({
        key: 'adminName',
        label: 'Admin felületi név',
        placeholder: 'pl.: Magyar',
        required: true,
        hint: 'Kérjük adja meg az admin felületen megjelenítendő nevet!'
      })
      
    ]
  }

  constructor() { }

  ngOnInit(): void {
  }

}
