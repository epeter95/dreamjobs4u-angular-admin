import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileService } from 'src/app/site-services/file.service';
import { Base } from '../classes/Base';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit {

  @Input() base!: Base<any>;
  @Input() form!: FormGroup;
  constructor(private fileService: FileService) {}
  fileUrl: any;
  ngOnInit(): void {}

  fileChange(file: any){
    this.form.controls[this.base.key].setValue('dummyValue');
    let selectedFile = file.target.files[0] as File;
    let fileData= {
      key: this.base.key,
      file: selectedFile
    }
    this.fileService.nextFile(fileData);
    if(this.base.fileType=='pdf'){
      this.fileUrl = selectedFile.name
    }else{
      const files = file.target.files;
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => { 
        this.fileUrl = reader.result; 
      }
    }
  }

}
