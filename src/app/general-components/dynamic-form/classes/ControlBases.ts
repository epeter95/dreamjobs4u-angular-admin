import { Base } from "./Base";


export class MultiDropdownBase extends Base<string> {
    controlType = 'multidropdown';
}

export class DropdownBase extends Base<string> {
    controlType = 'dropdown';
}

export class InputBase extends Base<string> {
    controlType = 'input';
}

export class TextboxBase extends Base<string> {
    controlType = 'textbox';
}

export class DatepickerBase extends Base<string> {
    controlType = 'datepicker';
}

export class FileBase extends Base<File> {
    controlType = 'file';
}

export class CheckboxBase extends Base<string> {
    controlType = 'checkbox';
}