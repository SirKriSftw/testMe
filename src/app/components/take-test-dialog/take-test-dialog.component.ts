import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-take-test-dialog',
  templateUrl: './take-test-dialog.component.html',
  styleUrl: './take-test-dialog.component.css'
})
export class TakeTestDialogComponent {

  practice: boolean = false;
  perfect: boolean = false;
  endless: boolean = false;

  exact: boolean = false;
  randomOrder: boolean = false;
  randomChoices: boolean = false;

  timer: boolean = true;
  testTimer: string | undefined;
  questionTimer: string | undefined;

  constructor(public dialogRef: MatDialogRef<TakeTestDialogComponent>){}

  takeTest()
  {
    const data = 
    {
      practice: this.practice,
      perfect: this.perfect,
      endless: this.endless,
      exact: this.exact,
      randomOrder: this.randomOrder,
      randomChoices: this.randomChoices,
      timer: this.timer,
      testTimer: this.testTimer,
      questionTimer: this.questionTimer,
    }

    this.dialogRef.close(data);
  }
}
