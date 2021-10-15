export interface HeaderElement{
    icon: string;
    text: string;
    url: string;
    nested?: boolean;
    nestedElements?: NestedHeaderElement[];
}

export interface NestedHeaderElement{
    text: string;
    url: string;
}