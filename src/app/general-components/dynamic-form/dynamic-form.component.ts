import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/site-services/data.service';
import { FileData, FileService } from 'src/app/site-services/file.service';
import { TableService } from 'src/app/site-services/table.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Base } from './classes/Base';
import { FormControlService } from './form-control.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() bases: Base<string>[] | null = [];
  @Input() serviceType: string = '';
  @Input() serviceUrl: string = '';
  @Input() isRefreshNeeded: boolean = false;
  @Output() panelEmitter = new EventEmitter();
  fileSubscription!: Subscription;
  modifyID: string = '';
  @Input() set setModifyForm(element: any) {
    if (element) {
      let value = { ...element };
      this.modifyID = element.id;
      let formControlNames = Object.keys(this.form.controls);
      let tableControlNames = Object.keys(element);
      for (let i = 0; i < tableControlNames.length; ++i) {
        if (Array.isArray(element[tableControlNames[i]])) {
          for (let j = 0; j < element[tableControlNames[i]].length; ++j) {
            element[tableControlNames[i]][j] = element[tableControlNames[i]][j]['id'];
          }
        }
      }
      let unCommonNames = tableControlNames.filter(name => { return formControlNames.indexOf(name) == -1 });
      for (let i = 0; i < unCommonNames.length; ++i) {
        delete value[unCommonNames[i]];
      }
      this.form.setValue(value);
    }
  }
  fileDatas: FileData[] = new Array();
  form!: FormGroup;
  constructor(private fcService: FormControlService, public dialog: MatDialog,
    private dataService: DataService, private tableService: TableService,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.initForm();
    this.fileSubscription = this.fileService.fileObservable$.subscribe(fileData => {
      let existFile = this.fileDatas.find(data => data.key == fileData.key);
      if (existFile) {
        let index = this.fileDatas.indexOf(existFile);
        this.fileDatas[index].file = fileData.file;
      } else {
        this.fileDatas.push(fileData);
      }
    });
  }

  initForm() {
    this.form = this.fcService.toFormGroup(this.bases as Base<string>[]);
  }

  ngOnDestroy() {
    this.fileSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      let formData = new FormData();
      let result = { ...this.form.value };
      let attributes = Object.keys(result);
      for (let i = 0; i < attributes.length; ++i) {
        formData.append(attributes[i], result[attributes[i]]);
      }
      for (let i = 0; i < this.fileDatas.length; ++i) {
        let formFileValue = result[this.fileDatas[i].key];
        if (formFileValue) {
          formData.append(this.fileDatas[i].key, this.fileDatas[i].file);
        }
      } let sendData;
      this.fileDatas.length > 0 ? sendData = formData : sendData = result;
      if (this.serviceType == 'create') {
        this.dataService.createData(this.serviceUrl, sendData).subscribe(res => {
          this.handleResponseFromSaveOrModify('closeCreate','Sikeres mentés!',res);
        }, error => {
          console.log(error);
        });
      } else {
        this.dataService.modifyData(this.serviceUrl, this.modifyID, sendData).subscribe(res => {
          this.handleResponseFromSaveOrModify('closeModify','Sikeres módosítás!',res);
        }, error => {
          console.log(error);
        });
      }
    } else {
      this.dialog.open(DialogComponent, {
        data: { icon: 'warning', text: 'Kérjük töltsön ki minden kötelező mezőt!' }
      })
    }
  }

  handleResponseFromSaveOrModify(panelName: string, dialogText: string, res: any) {
    console.log(res);
    if (res.error == 'SequelizeUniqueConstraintError') {
      this.dialog.open(DialogComponent, {
        data: { icon: 'warning', text: 'Ez az elem már létezik!' }
      });
      return
    }
    if (res.hasOwnProperty('error')) {
      this.dialog.open(DialogComponent, {
        data: { icon: 'warning', text: 'Ismeretlen hiba!',value: 'oka: ' + res.error }
      });
      return;
    }
    this.tableService.setNextText('refresh');
    this.panelEmitter.emit(panelName);
    this.form.reset();
    this.initForm();
    this.fileDatas = new Array();
    if (this.isRefreshNeeded) {
      this.dataService.setNextText('refresh');
    }
    this.dialog.open(DialogComponent, {
      data: { icon: 'done', text: dialogText }
    })
  }

}
