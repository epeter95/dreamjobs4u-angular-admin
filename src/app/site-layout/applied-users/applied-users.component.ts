import { Component, OnInit } from '@angular/core';
import { DropdownBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-applied-users',
  templateUrl: './applied-users.component.html',
  styleUrls: ['./applied-users.component.scss']
})
export class AppliedUsersComponent implements OnInit {

  appliedUsersOption: BaseOption = {
    name: 'Állásra jelentkezett felhasználók',
    icon: 'assignment_ind',
    apiUrl: '/api/usersAppliedToJobs',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'User', name: 'Felhasználó', searchAttribute: 'email',format: 'json' },
      {id: 'Job', name: 'Állás', searchAttribute: 'companyName',format: 'json' },
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük az Állásra jelentkezett felhasználók oldalon!',
    subtitle:  'Itt tudja állítani az oldalon szereplő állásokra jelentkezett felhasználókat!',
    formBases: [

      new DropdownBase({
        key: 'userId',
        label: 'Felhasználó',
        optionsUrl: '/api/users',
        optionKey: 'id',
        optionValue: 'email',
        required: true,
        hint: 'Válassza ki a felhasználót!'
      },this.dataService),

      new DropdownBase({
        key: 'jobId',
        label: 'Állás',
        optionsUrl: '/api/jobs',
        optionKey: 'id',
        optionValue: 'companyName',
        required: true,
        hint: 'Válassza ki az állást!'
      },this.dataService),
      
    ]
  };

  constructor(private dataService: DataService){}

  ngOnInit(): void {
  }

}
