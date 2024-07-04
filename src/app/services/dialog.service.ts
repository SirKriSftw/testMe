import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TakeTestDialogComponent } from '../components/take-test-dialog/take-test-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(): MatDialogRef<TakeTestDialogComponent> {
    return this.dialog.open(TakeTestDialogComponent, {
      width: "50%"
    })
  }
}
