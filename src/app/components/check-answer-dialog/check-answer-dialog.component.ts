import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-check-answer-dialog',
  templateUrl: './check-answer-dialog.component.html',
  styleUrl: './check-answer-dialog.component.css'
})
export class CheckAnswerDialogComponent {

  @Input() userAnswer!: string;
  @Input() setAnswer!: string;
  isCorrect: boolean = false;

  constructor(public dialogRef: MatDialogRef<CheckAnswerDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.userAnswer = data.userAnswer;
    this.setAnswer = data.setAnswer;
  }

  next()
  {
    this.dialogRef.close(this.isCorrect);
  }
}
