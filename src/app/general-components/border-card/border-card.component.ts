import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { BaseOption } from 'src/app/interfaces/BaseOption';

@Component({
  selector: 'app-border-card',
  templateUrl: './border-card.component.html',
  styleUrls: ['./border-card.component.scss']
})
export class BorderCardComponent implements OnInit {
  @Input() option!: BaseOption;
  @ViewChild('createPanel') createPanel!: MatExpansionPanel;
  @ViewChild('modifyPanel') modifyPanel!: MatExpansionPanel;
  modifyElement: any;
  constructor() { }

  ngOnInit(): void {
  }

  sendIdToModifyForm(element: any){
    this.modifyPanel.open();
    this.modifyElement = element;
  }

  closePanelOnSubmit(event: any){
    event == 'closeCreate' ? this.createPanel.close() : this.modifyPanel.close();
  }

  getModifyFormBases(){
    return this.option.formBases ? this.option.formBases.filter(element=>element.neededToModifyForm == 'yes') : null;
  }

  closePanel(){
    this.modifyPanel.close();
  }

}
