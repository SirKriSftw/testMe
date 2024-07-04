import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrl: './new-question.component.css'
})
export class NewQuestionComponent {

  @Input() testId: number = 0;
}
