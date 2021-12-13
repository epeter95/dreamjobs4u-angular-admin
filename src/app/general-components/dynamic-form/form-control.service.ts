import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Base } from './classes/Base';

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  constructor() { }
  //form létrehozása required lehetőséggel base class alapján
  toFormGroup(bases: Base<string>[] ) {
    const group: any = {};

    bases.forEach(base => {
      group[base.key] = base.required ? new FormControl(base.value || '', Validators.required)
                                              : new FormControl(base.value || '');
    });
    return new FormGroup(group);
  }
}
