import { Component, OnInit } from '@angular/core';
import { DropdownBase, InputBase } from 'src/app/general-components/dynamic-form/classes/ControlBases';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  eventsOption: BaseOption = {
    name: 'Események',
    icon: 'event',
    apiUrl: '/api/events',
    displayedColumns: [
      {id: 'id', name: 'No.'},
      {id: 'Owner', name: 'Létrehozó', searchAttribute: 'email',format: 'json' },
      {id: 'Users', name: 'Interjúztatott', searchAttribute: 'email',format: 'json' },
      {id: 'Job', name: 'Állás cég', searchAttribute: 'companyName',format: 'json' },
      {id: 'startDate', name: 'Kezdési időpont',format: 'date' },
      {id: 'createdAt', name: 'Létrehozva', format: 'date'},
      {id: 'updatedAt', name: 'Módosítva', format: 'date'},{id: 'modifiers', name:'', format: 'modifiers'}
    ],
    title: 'Üdvözöljük az Állásra jelentkezett felhasználók oldalon!',
    subtitle:  'Itt tudja állítani az oldalhoz tartozó eseményeket!',
    formBases: [

      new DropdownBase({
        key: 'ownerId',
        label: 'Létrehozó',
        optionsUrl: '/api/users',
        optionKey: 'id',
        optionValue: 'email',
        required: true,
        hint: 'Válassza ki az esemény tulajdonosát!'
      },this.dataService),

      new DropdownBase({
        key: 'userId',
        label: 'Interjúztatott',
        optionsUrl: '/api/users',
        optionKey: 'id',
        optionValue: 'email',
        required: true,
        hint: 'Válassza ki az eseményen részt vevő másik felet!'
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

      new InputBase({
        key: 'startDate',
        label: 'Esemény kezdeti időpontja ( formátum például: 2021.11.11.-11:11 )',
        placeholder: 'pl.: Munkaválllaló',
        required: true,
        hint: 'Kérjük adja meg az esemény kezdeti időpontját!'
      }),
      
    ]
  };

  constructor(private dataService: DataService){}

  ngOnInit(){}

}
