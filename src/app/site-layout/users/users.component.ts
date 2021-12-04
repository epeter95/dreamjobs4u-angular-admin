import { Component, OnInit } from '@angular/core';
import { DropdownBase, InputBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  adminUserOption: BaseOption = {
    name: 'Felhasználók',
    icon: 'supervised_user_circle',
    apiUrl: '/api/users/adminUsers',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'firstName', name: 'Vezetéknév'},{id: 'lastName', name: 'Keresztnév'},
      {id: 'email', name: 'Email cím'},
      {id: 'Role', name: 'Szerepkör', searchAttribute: 'adminName',format: 'json' },
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Felhasználók kezelése!',
    subtitle: 'Itt tudja szerkeszteni a publikus- ,illetve az admin felülethez tartozó felhasználókat.',
    formBases: [

      new InputBase({
        key: 'firstName',
        label: 'Felhasználó vezetékneve',
        required: true,
        hint: 'Kérjük adja meg a felhasználó vezetéknevét!'
      }),

      new InputBase({
        key: 'lastName',
        label: 'Felhasználó keresztneve',
        required: true,
        hint: 'Kérjük adja meg a felhasználó keresztnevét!'
      }),

      new InputBase({
        key: 'email',
        label: 'Felhasználó email címe',
        required: true,
        hint: 'Kérjük adja meg a felhasználó email címét!'
      }),

      new InputBase({
        key: 'password',
        label: 'Felhasználó jelszava',
        required: true,
        hint: 'Kérjük adja meg a felhasználó jelszavát!'
      }),

      new DropdownBase({
        key: 'roleId',
        label: 'Szerepkör',
        optionsUrl: '/api/roles/adminRoles',
        optionKey: 'id',
        optionValue: 'adminName',
        required: true,
        hint: 'Válassza ki a szerepkört!'
      },this.dataService)
    ]
  }
  
  userOption: BaseOption = {
    name: 'Felhasználók',
    icon: 'supervised_user_circle',
    apiUrl: '/api/users/publicUsers',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'firstName', name: 'Vezetéknév'},{id: 'lastName', name: 'Keresztnév'},
      {id: 'email', name: 'Email cím'},
      {id: 'Role', name: 'Szerepkör', searchAttribute: 'adminName',format: 'json' },
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Felhasználók kezelése!',
    subtitle: 'Itt tudja szerkeszteni a publikus- ,illetve az admin felülethez tartozó felhasználókat.',
    formBases: [

      new InputBase({
        key: 'firstName',
        label: 'Felhasználó vezetékneve',
        required: true,
        hint: 'Kérjük adja meg a felhasználó vezetéknevét!'
      }),

      new InputBase({
        key: 'lastName',
        label: 'Felhasználó keresztneve',
        required: true,
        hint: 'Kérjük adja meg a felhasználó keresztnevét!'
      }),

      new InputBase({
        key: 'email',
        label: 'Felhasználó email címe',
        required: true,
        hint: 'Kérjük adja meg a felhasználó email címét!'
      }),

      new InputBase({
        key: 'password',
        label: 'Felhasználó jelszava',
        required: true,
        hint: 'Kérjük adja meg a felhasználó jelszavát!'
      }),

      new DropdownBase({
        key: 'roleId',
        label: 'Szerepkör',
        optionsUrl: '/api/roles/publicRoles',
        optionKey: 'id',
        optionValue: 'adminName',
        required: true,
        hint: 'Válassza ki a szerepkört!'
      },this.dataService)
    ]
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
