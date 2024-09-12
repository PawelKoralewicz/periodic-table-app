import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,

  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';
import { DialogData } from '../../shared/interfaces/dialog-data.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-periodic-element-edit-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './periodic-element-edit-dialog.component.html',
  styleUrl: './periodic-element-edit-dialog.component.scss'
})
export class PeriodicElementEditDialogComponent {

  readonly dialogRef = inject(MatDialogRef<PeriodicElementEditDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly value = model();

  getInputType() {
    return typeof this.data.value === 'number' ? 'number' : 'text';
  }

  onCancel() {
    this.dialogRef.close();
  }

}
