import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  icon: string;
  text: string;
  value?: string;
  cancel?: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  cancelDialog(): void {
    this.dialogRef.close();
  }
  acceptance: boolean = false;
  ngOnInit(): void {
  }

  okDialog(){
    if(this.data.cancel){
      this.acceptance = true;
    }
    this.dialogRef.close();
  }

}
