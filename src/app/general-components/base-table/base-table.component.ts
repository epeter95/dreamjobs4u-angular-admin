import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { BaseOption } from 'src/app/interfaces/BaseOption';
import { DataService } from 'src/app/site-services/data.service';
import { TableService } from 'src/app/site-services/table.service';
import { DialogComponent } from '../dialog/dialog.component';


export interface TableColumn {
  id: string;
  name: string;
  format?: string;
  searchAttribute?: string;
  searchAttributeParent?: string;
}

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent implements OnInit, OnDestroy {
  displayedColumns: TableColumn[] = new Array();
  columnsToShow: string[] = new Array();
  option!: BaseOption;
  //tábla oszlopok és megjelenítéseik beállítása
  @Input() set setOption(option: BaseOption) {
    if (option.displayedColumns) {
      this.option = option;
      this.displayedColumns = option.displayedColumns;
      this.columnsToShow = this.displayedColumns.map(column => column.id);
    }
  };
  @Output() modifyEmitter = new EventEmitter();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  matTableDataSource!: MatTableDataSource<any>;
  tableSubscription!: Subscription;
  differ: any;
  showPaginator: boolean = false;

  constructor(private dataService: DataService, private tableService: TableService, public dialog: MatDialog) { }
  //tábla újratöltés subscriptionre feliratkozás, tábla betöltése
  ngOnInit(): void {
    this.refreshTable();
    this.tableSubscription = this.tableService.tableObservable$.subscribe(msg => {
      if (msg == 'refresh') this.refreshTable();
    })
  }

  ngOnDestroy() {
    this.tableSubscription.unsubscribe();
  }
  //tábla inicializálása, egyedi filterpredikátum megadásával, paginátor ha szükséges, és rendezés
  refreshTable() {
    this.dataService.getAllData(this.option.apiUrl!).subscribe(res => {

      this.matTableDataSource = new MatTableDataSource(res);
      this.matTableDataSource.filterPredicate = (data, filter) => {
        let dataKeys = Object.keys(data);
        let filteredData = this.displayedColumns.filter(column => dataKeys.includes(column.id));
        let booleans = [];
        for (let i = 0; i < filteredData.length; ++i) {
          let element = filteredData[i];
          if (data[element.id]) {
            if (element.format == 'json') {
              let isExist;
              if (element.searchAttributeParent) {
                isExist = data[element.id][element.searchAttributeParent!][element.searchAttribute!].toString().toLowerCase().startsWith(filter);
              } else {
                isExist = data[element.id][element.searchAttribute!].toString().toLowerCase().startsWith(filter);
              }
              booleans.push(isExist);
            } else {
              let isExist = data[element.id].toString().toLowerCase().startsWith(filter);
              booleans.push(isExist);
            }
          }
        }
        return booleans.includes(true);
      }
      if (res.length > 5) {
        this.showPaginator = true;
        setTimeout(() => this.matTableDataSource.paginator = this.paginator, 10);
      }
      setTimeout(() => this.matTableDataSource.sort = this.sort, 10);
    });
  }
  //tábla oszlopaiban keresés metódus
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();
    // let filteredLength = this.matTableDataSource.filteredData.length;
  }
  //tábla sor elküldése border cardnak
  modifyClick(id: any) {
    this.modifyEmitter.emit(id);
  }
  //tábla oszlopok törlése figyelmeztető dialógus megjelenítés és elfogadás után
  deleteClick(id: string) {
    const ref = this.dialog.open(DialogComponent, {
      data: { icon: 'warning', text: 'Biztos hogy törli az adott elemet?', value: 'A művelet nem visszavonható!', cancel: true }
    });
    ref.afterClosed().subscribe(() => {
      if (ref.componentInstance.acceptance) {
        let url = this.option.apiFormUrl ? this.option.apiFormUrl : this.option.apiUrl;
        this.dataService.deleteData(url!, id).subscribe(res => {
          this.tableService.setNextText('refresh');
          this.dataService.setNextText('refresh');
        });
      }
    })
  }
  //tábla sorokban törlés eltüntetése kivétel sorokban kulcs alapján
  getExceptions(element: any) {
    if (element.Role) {
      if (element.Role.key == 'superadmin') {
        return false;
      }
    }
    if(element.Language){
      if(element.Language.key=='hu'){
        return false;
      }
    }
    if (element.key == 'hu') {
      return false;
    } else {
      return true;
    }
  }

}
