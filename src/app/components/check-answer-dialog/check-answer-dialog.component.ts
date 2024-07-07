import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-check-answer-dialog',
  templateUrl: './check-answer-dialog.component.html',
  styleUrl: './check-answer-dialog.component.css'
})
export class CheckAnswerDialogComponent {

  userAnswer!: string;
  setAnswer!: string;
  question!: string;
  isCorrect: boolean = false;

  constructor(public dialogRef: MatDialogRef<CheckAnswerDialogComponent>,
            @Inject(MAT_DIALOG_DATA) public data:any
  ){
    console.log(data);
    this.userAnswer = data.userAnswer;
    this.setAnswer = data.setAnswer;
    this.question = data.question;
  }

  next()
  {
    this.dialogRef.close(this.isCorrect);
  }
}
