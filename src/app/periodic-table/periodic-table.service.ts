import { Injectable } from '@angular/core';
import { ELEMENT_DATA } from '../shared/data/periodics';
import { Observable } from 'rxjs';
import { PeriodicElement } from '../shared/interfaces/periodic-element.interface';

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableService {

  data = ELEMENT_DATA;

  constructor() { }

  // simulation of sending GET request to server
  getData(): Observable<PeriodicElement[]> {
    return new Observable(subscriber => {
      subscriber.next(this.data);
      subscriber.complete();
    });
  }

  // simulation of sending PUT request to server
  // *IMPORTANT*: This only works under condition that every value is unique. In real app it would be found by an ID. In this case other option is to search by 'position' value if it shouldn't be changeable.
  updateData(oldValue: Partial<PeriodicElement>, newValue: Partial<PeriodicElement>, column: keyof PeriodicElement): Observable<PeriodicElement[]> {
    this.data.map(el => {
      if(el[column] === oldValue) (el[column] as Partial<PeriodicElement>) = newValue
    })

    return this.getData();
  }
}
