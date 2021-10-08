import { DataService } from "src/app/site-services/data.service";

export class Base<T> {
    value: T|undefined;
    key: string;
    label: string;
    required: boolean;
    placeholder: string;
    optionsUrl: string;
    order: number;
    controlType: string;
    optionKey: string;
    neededToModifyForm: string;
    optionValue: string;
    optionValueParent: string;
    width: string;
    type: string;
    hint: string;
    fileType: string;
    rangepicker: boolean;
    fileAccept: string;
    options: {key: string, value: string}[];
  
    constructor(options: {
        value?: T;
        key?: string;
        label?: string;
        fileType?: string;
        rangepicker?: boolean;
        required?: boolean;
        neededToModifyForm?: string;
        placeholder?: string;
        fileAccept?: string;
        optionsUrl?:string;
        hint?: string;
        width?: string;
        order?: number;
        controlType?: string;
        type?: string;
        optionKey?: string;
        optionValue?: string;
        optionValueParent?:string;
        options?: {key: string, value: string}[];
      } = {}, private dataService? :DataService) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.fileType = options.fileType || 'image';
      this.placeholder= options.placeholder || '';
      this.rangepicker = options.rangepicker || false;
      this.optionsUrl = options.optionsUrl || '';
      this.neededToModifyForm = options.neededToModifyForm || 'yes';
      this.optionKey = options.optionKey || '';
      this.fileAccept = options.fileAccept || 'image/*';
      this.optionValue = options.optionValue ||'';
      this.optionValueParent = options.optionValueParent || '';
      this.width = options.width || '52%';
      this.hint = options.hint || '';
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.options = options.options || [];
      if(this.optionsUrl!=''){
        this.dataService?.drowDownObservable$.subscribe(res=>{
          if(res=='refresh'){
            this.dataService?.getAllData(this.optionsUrl).subscribe(res=>{
              this.options = res.map(element => element = { key: element[this.optionKey], value: this.optionValueParent ? element[this.optionValueParent][this.optionValue]  :  element[this.optionValue]} );
            });
          }
        })
      }
    }
  }