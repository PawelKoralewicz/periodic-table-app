import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PeriodicTableService } from './periodic-table.service';
import { PeriodicElement } from '../shared/interfaces/periodic-element.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { COLUMNS } from '../shared/enums/columns.enum';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { MatDialog } from '@angular/material/dialog';
import { PeriodicElementEditDialogComponent } from './periodic-element-edit-dialog/periodic-element-edit-dialog.component';
import { map, Observable, tap } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CapitalizePipe,
    AsyncPipe
  ],
  providers: [RxState],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent implements OnInit {

  // columns = COLUMNS; // used only in 2nd approach to table's code structure in HTML
  elements$!: Observable<PeriodicElement[]>;
  readonly displayedColumns: (keyof PeriodicElement)[] = Object.values(COLUMNS);
  readonly dialog = inject(MatDialog);
  private filterTimeout: NodeJS.Timeout | number = 0;

  constructor(private periodicTableService: PeriodicTableService, private state: RxState<{ elements: PeriodicElement[] }>) {
    this.state.set({ elements: [] })
  }

  ngOnInit(): void {
    this.getData();
  }

  // simulation of sending GET request to server
  getData() {
    const data$ = this.periodicTableService.getData();
    this.state.connect('elements', data$);
    this.elements$ = this.state.select('elements');
  }

  filterData(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.elements$ = this.state.select('elements').pipe(
        // debounceTime(2000), // it causes 2s pause in updating value in edit mode after filtering, so timeout is being used instead
        map(elements => {
          const dataSource = new MatTableDataSource(elements);
          dataSource.filter = target.value;
          return dataSource.filteredData;
        })
      )
    }, 2000);
  }

  editDataElement(elementProperty: Partial<PeriodicElement>, index: number, column: keyof PeriodicElement) {
    const dialogRef = this.dialog.open(PeriodicElementEditDialogComponent, {
      data: { column, value: elementProperty }
    });

    dialogRef.afterClosed().subscribe((res: Partial<PeriodicElement> | undefined) => {
      if (res !== undefined) {
        this.elements$ = this.elements$.pipe(
          map(el => {
            const updatedElements = [...el];
            (el[index][column] as Partial<PeriodicElement>) = res;
            return updatedElements;
          })
        );
      }
    });

  }
}
