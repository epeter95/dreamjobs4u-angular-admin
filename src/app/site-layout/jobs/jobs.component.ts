import { Component, OnInit } from '@angular/core';
import { InputBase, DropdownBase, TextboxBase, FileBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
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
      {id: 'companyName', name: 'Cégnév'},{id: 'logoUrl', name: 'Logo'},
      {id: 'jobLocation', name: 'Székhely'},
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

      new InputBase({
        key: 'taskList',
        label: 'Feladat lista',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a feladat leírását!'
      }),

      new InputBase({
        key: 'offerList',
        label: 'Feladat lista',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg az állás ajánlatát!'
      }),

      new InputBase({
        key: 'expectationList',
        label: 'Elvárások',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg az elvárásokat!'
      }),

      new InputBase({
        key: 'requiredExperience',
        label: 'Tapasztalat',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg az elvárásokat!'
      }),

      new InputBase({
        key: 'requiredQualification',
        label: 'Végzettség',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg az elvárt végzettséget!'
      }),

      new InputBase({
        key: 'requiredLanguage',
        label: 'Nyelvi szint',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg a nyelvi elvárásokat!'
      }),

      new InputBase({
        key: 'employmentType',
        label: 'Munka beosztás',
        required: true,
        neededToModifyForm: 'false',
        hint: 'Kérjük adja meg az munka beosztást!'
      }),
      
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
      {id: 'taskList', name: 'Feladat leírás'},{id: 'expectationList', name: 'Elvárások'},
      {id: 'offerList', name: 'Elvárások'},{id: 'requiredExperience', name: 'Tapasztalat'},
      {id: 'requiredQualification', name: 'Végzettség'},{id: 'requiredLanguage', name: 'Nyelvi Tapasztalat'},
      {id: 'employmentType', name: 'Munka beosztás'},
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

      new InputBase({
        key: 'taskList',
        label: 'Feladat lista',
        required: true,
        hint: 'Kérjük adja meg a feladat leírását!'
      }),

      new InputBase({
        key: 'offerList',
        label: 'Feladat lista',
        required: true,
        hint: 'Kérjük adja meg az állás ajánlatát!'
      }),

      new InputBase({
        key: 'expectationList',
        label: 'Elvárások',
        required: true,
        hint: 'Kérjük adja meg az elvárásokat!'
      }),

      new InputBase({
        key: 'requiredExperience',
        label: 'Tapasztalat',
        required: true,
        hint: 'Kérjük adja meg az elvárásokat!'
      }),

      new InputBase({
        key: 'requiredQualification',
        label: 'Végzettség',
        required: true,
        hint: 'Kérjük adja meg az elvárt végzettséget!'
      }),

      new InputBase({
        key: 'requiredLanguage',
        label: 'Nyelvi szint',
        required: true,
        hint: 'Kérjük adja meg a nyelvi elvárásokat!'
      }),

      new InputBase({
        key: 'employmentType',
        label: 'Munka beosztás',
        required: true,
        hint: 'Kérjük adja meg az munka beosztást!'
      }),
    ]
  }

  constructor(private dataService: DataService) { }
  
  ngOnInit(): void {
  }

}
