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

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatTableModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    CapitalizePipe
  ],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss'
})
export class PeriodicTableComponent implements OnInit {

  // columns = COLUMNS; // used only in 2nd approach to table's code structure in HTML
  dataSource: MatTableDataSource<PeriodicElement> = new MatTableDataSource();
  readonly displayedColumns: (keyof PeriodicElement)[] = Object.values(COLUMNS);
  readonly dialog = inject(MatDialog);
  private filterTimeout: NodeJS.Timeout | number = 0;

  constructor(private periodicTableService: PeriodicTableService) { }

  ngOnInit(): void {
    this.getData();
  }

  // simulation of sending GET request to server
  getData() {
    this.periodicTableService.getData().subscribe(res => this.dataSource.data = res);
  }

  filterData(e: KeyboardEvent) {
    const target = e.target as HTMLInputElement;

    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.dataSource.filter = target.value
    }, 2000);
  }

  editDataElement(el: Partial<PeriodicElement>, column: keyof PeriodicElement) {
    const dialogRef = this.dialog.open(PeriodicElementEditDialogComponent, {
      data: { column, value: el }
    })
    
    dialogRef.afterClosed().subscribe((res: Partial<PeriodicElement> | undefined) => {
      if(res !== undefined) {
        this.updateDataSrc(el, res, column);
      }
    })
  }

  // simulation of sending PUT request to server
  // *IMPORTANT*: This only works under condition that every value is unique. In real app it would be found by an ID. In this case other option is to search by 'position' value if it shouldn't be changeable.
  updateDataSrc(oldValue: Partial<PeriodicElement>, newValue: Partial<PeriodicElement>, column: keyof PeriodicElement) {
    this.periodicTableService.data.map(el => {
      if(el[column] === oldValue) (el[column] as Partial<PeriodicElement>) = newValue;
    })
    this.getData();
  }


}
