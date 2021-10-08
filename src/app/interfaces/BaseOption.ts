import { TableColumn } from "../general-components/base-table/base-table.component";
import { Base } from "../general-components/dynamic-form/classes/Base";

export interface BaseOption{
    name: string,
    title: string,
    apiUrl?: string,
    apiFormUrl?:string,
    subtitle: string,
    disableCreatePanel?: boolean,
    displayedColumns?: TableColumn[],
    icon: string,
    formBases?: Base<any>[];
    dropdownRefresh?: boolean;
}