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

  getData(): Observable<PeriodicElement[]> {
    return new Observable(subscriber => {
      subscriber.next(this.data);
      subscriber.complete();
    });
  }
}
