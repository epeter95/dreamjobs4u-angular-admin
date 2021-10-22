import { Component, OnInit } from '@angular/core';
import { InputBase, DropdownBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryOption: BaseOption = {
    name: 'Kategóriák',
    icon: 'category',
    disableCreatePanel: true,
    apiUrl: '/api/categories',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'key', name: 'Kategória kulcsa'},
      {id: 'adminName', name: 'Admin felületi név'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a Kategóriák szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő kategóriákat, és fordításaikat. A magyar nyelvű fordítás felvétele kötelező!',
    formBases: [

      new InputBase({
        key: 'key',
        label: 'Kategória kulcsa',
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
        label: 'Kategória neve',
        neededToModifyForm: 'false',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő tartalmat!'
      })
      
    ]
  };

  categoryTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/categoryTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'Category', name: 'Kategória', searchAttribute: 'adminName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'text', name: 'Kategória neve'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Hibaüzenetek publikos oldalon megjelenítendő fordításainak lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'categoryId',
        label: 'Kategória',
        optionsUrl: '/api/categories',
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
        label: 'Kategória neve',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő tartalmat!'
      })
    ]
  }
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

}
