import { PeriodicElement } from "./periodic-element.interface";

export interface DialogData {
    column: keyof PeriodicElement;
    value: number | string;
}