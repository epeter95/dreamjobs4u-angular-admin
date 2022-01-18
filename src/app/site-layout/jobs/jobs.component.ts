import { Component, OnInit } from '@angular/core';
import { InputBase, DropdownBase, TextboxBase, FileBase, CheckboxBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  jobOption: BaseOption = {
    name: 'Munkáltatókhoz kötött állások',
    icon: 'work',
    apiUrl: '/api/jobs',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'User', name: 'Felhasználó', format: 'json',searchAttribute: 'email'},
      {id: 'Category', name: 'Kategória', format: 'json',searchAttribute: 'adminName'},
      {id: 'companyName', name: 'Cégnév'},{id: 'logoUrl', name: 'Logo'},
      {id: 'jobLocation', name: 'Székhely'},{id: 'companyWebsite', name: 'Cég weblapja'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük a munkáltatókhoz kötött állások szerkesztése oldalon!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő munkáltatókhoz kötött állásokat, és fordításait. A magyar nyelvű fordítás felvétele kötelező!',
    formBases: [

      new DropdownBase({
        key: 'userId',
        label: 'Felhasználó',
        optionsUrl: '/api/users',
        optionKey: 'id',
        optionValue: 'email',
        required: true,
        hint: 'Válassza ki a felhasználót, akihez az állás tartozik!'
      },this.dataService),

      new InputBase({
        key: 'companyName',
        label: 'Cégnév',
        placeholder: 'pl.: Munkaválllaló',
        required: true,
        hint: 'Kérjük adja meg a cég nevet!'
      }),

      new FileBase({
        key: 'logoUrl',
        label: 'Logo',
        required: true,
        hint: 'Kérjük adja meg a cég logoját'
      }), 

      new InputBase({
        key: 'jobLocation',
        label: 'Székhely',
        required: true,
        hint: 'Kérjük adja meg a vég székhelyét!'
      }),

      new InputBase({
        key: 'companyWebsite',
        label: 'Cég weblap',
        required: true,
        hint: 'Kérjük adja meg a cég weblapját!'
      }),

      new DropdownBase({
        key: 'categoryId',
        label: 'Kategória',
        required: true,
        optionsUrl: '/api/categories/jobDropdownCategories',
        optionKey: 'id',
        optionValue: 'adminName',
        hint: 'Kérjük adja meg az állás kategóriáját!'
      },this.dataService),

      new CheckboxBase({
        key: 'showOnMainPage',
        label: 'Főoldali megjelenítés'
      }),

      new InputBase({
        key: 'title',
        label: 'Feladat megnevezése',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),
      
      new TextboxBase({
        key: 'aboutUs',
        label: 'Rólunk',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a cég leírását!'
      }),

      new TextboxBase({
        key: 'jobDescription',
        label: 'Állás leírása',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a cég leírását!'
      }),

      new InputBase({
        key: 'payment',
        label: 'Fizetés',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'jobType',
        label: 'Munakvégzés',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'experience',
        label: 'Tapasztalat',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'qualification',
        label: 'Végzettség',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'language',
        label: 'Nyelvi elvárás',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      })
      
    ]
  };

  jobTranslationOption: BaseOption = {
    name: 'Fordítások',
    icon: 'language',
    apiUrl: '/api/jobTranslations',
    displayedColumns: [
      {id: 'id', name: 'No.'}, {id: 'Job', name: 'Állás', searchAttribute: 'companyName',format: 'json' },
      {id: 'Language', name: 'Nyelv', searchAttribute: 'adminName',format: 'json' },
      {id: 'title', name: 'Állás címe'},{id: 'aboutUs', name: 'Rólunk'},
      {id: 'jobDescription', name: 'Feladat leírás'},
      {id: 'payment', name: 'Fizetés'},
      {id: 'jobType', name: 'Munkavégzés'},
      {id: 'experience', name: 'Tapasztalat'},
      {id: 'qualification', name: 'Végzettség'},
      {id: 'language', name: 'Nyelvi képzettség'},
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Állások fordításainak szerkesztésének lehetősége!',
    subtitle:  'Itt tudja állítani az oldalon megjelenítendő fordításokat',
    formBases: [
      new DropdownBase({
        key: 'jobId',
        label: 'Állás',
        optionsUrl: '/api/jobs',
        optionKey: 'id',
        optionValue: 'companyName',
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
        label: 'Feladat megnevezése',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),
      
      new TextboxBase({
        key: 'aboutUs',
        label: 'Rólunk',
        required: true,
        hint: 'Kérjük adja meg a cég leírását!'
      }),

      new TextboxBase({
        key: 'jobDescription',
        label: 'Feladat lista',
        required: true,
        hint: 'Kérjük adja meg az állás leírását!'
      }),

      new InputBase({
        key: 'payment',
        label: 'Fizetés',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'jobType',
        label: 'Munakvégzés',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'experience',
        label: 'Tapasztalat',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'qualification',
        label: 'Végzettség',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      }),

      new InputBase({
        key: 'language',
        label: 'Nyelvi elvárás',
        required: true,
        hint: 'Kérjük adja meg a publikus felületen megjelenítendő nevet!'
      })
    ]
  }

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
  }

}
