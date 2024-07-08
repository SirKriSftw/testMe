import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TakeTestDialogComponent } from '../components/take-test-dialog/take-test-dialog.component';
import { CheckAnswerDialogComponent } from '../components/check-answer-dialog/check-answer-dialog.component';
import { MakeDialogComponent } from '../components/make-dialog/make-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialog: string, data: any = undefined): MatDialogRef<any> {
    if(dialog == "take-test")
    {
      return this.dialog.open(TakeTestDialogComponent, {
        width: "50%"
      })
    }
    else if (dialog == "check-answer")
    {
      return this.dialog.open(CheckAnswerDialogComponent, {
        data: {
          userAnswer: data.userAnswer,
          setAnswer: data.setAnswer,
          question: data.question
        },
        width: "20%"
      })
    }
    else if (dialog == "make")
      {
        return this.dialog.open(MakeDialogComponent, {
          width: "20%"
        })
      }

    return this.dialog.open(MakeDialogComponent, {
      width: "20%"
    })


  }
}
