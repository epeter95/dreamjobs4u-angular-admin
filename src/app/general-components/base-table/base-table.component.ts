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
  searchAttributeParent?:string;
}

@Component({
  selector: 'app-base-table',
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})
export class BaseTableComponent implements OnInit,OnDestroy {
  displayedColumns: TableColumn[] = new Array();
  columnsToShow: string[] = new Array();
  option!: BaseOption;
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

  ngOnInit(): void {
    this.refreshTable();
    this.tableSubscription = this.tableService.tableObservable$.subscribe(msg=>{
      if(msg == 'refresh')this.refreshTable();
    })
  }

  ngOnDestroy(){
    this.tableSubscription.unsubscribe();
  }

  refreshTable() {
    this.dataService.getAllData(this.option.apiUrl!).subscribe(res => {
      for(let i=0;i<res.length;++i){
        if(res[i]['startTime']){
          res[i]['startTime'] = res[i]['startTime'].split(':')[0]+':'+res[i]['startTime'].split(':')[1]
        }

        if(res[i]['endTime']){
          res[i]['endTime'] = res[i]['endTime'].split(':')[0]+':'+res[i]['endTime'].split(':')[1]
        }
      }

      this.matTableDataSource = new MatTableDataSource(res);
      this.matTableDataSource.filterPredicate = (data,filter)=>{
        let dataKeys = Object.keys(data);
        let filteredData = this.displayedColumns.filter(column => dataKeys.includes(column.id));
        let booleans = [];
        for(let i=0;i<filteredData.length;++i){
          let element = filteredData[i];
          if(data[element.id]){
            if(element.format == 'json'){
              let isExist;
              if(element.searchAttributeParent){
                isExist = data[element.id][element.searchAttributeParent!][element.searchAttribute!].toString().toLowerCase().startsWith(filter);
              }else{
                isExist = data[element.id][element.searchAttribute!].toString().toLowerCase().startsWith(filter);
              }
              booleans.push(isExist);
            }else{
              let isExist = data[element.id].toString().toLowerCase().startsWith(filter);
              booleans.push(isExist);
            }
          }
        }
        return booleans.includes(true);
      }
      if (res.length > 5) {
        this.showPaginator = true;
        setTimeout(()=>this.matTableDataSource.paginator = this.paginator,10);
      }
      setTimeout(()=>this.matTableDataSource.sort = this.sort,10);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();
    // let filteredLength = this.matTableDataSource.filteredData.length;
  }

  modifyClick(id: any) {
    this.modifyEmitter.emit(id);
  }

  deleteClick(id: string) {
    const ref =this.dialog.open(DialogComponent,{
      data: {icon: 'warning', text: 'Are you sure to want to delete that Item?', value: 'Operation cannot be reversed!', cancel: true}
    });
    ref.afterClosed().subscribe(()=>{
      if(ref.componentInstance.acceptance){
        let url = this.option.apiFormUrl ? this.option.apiFormUrl : this.option.apiUrl;
        this.dataService.deleteData(url!, id).subscribe(res => {
          this.refreshTable();
        });
      }
    })
  }

}
