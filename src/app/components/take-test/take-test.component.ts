import { Component, Input } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestsService } from '../../services/tests.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css'
})
export class TakeTestComponent {

  options: any = {};
  test?: Test = undefined;
  id: number = -1;
  questionIndex = 0;
  currentQuestion?: Question = undefined;

  constructor(private testsService: TestsService,
              private route: ActivatedRoute
  ) {}

  ngOnInit()
  {
    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.testsService.getTest(this.id).subscribe(
      (r) => {
        this.test = r;
        if(this.test?.questions) this.currentQuestion = this.test?.questions[this.questionIndex];
      }
    );
    this.options = history.state.info;
    console.log(this.options);
  }

  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  nextQuestion()
  {
    if(this.test?.questions)
    {
      if(this.questionIndex + 1 < this.test?.questions.length) this.questionIndex++;
      this.currentQuestion = this.test?.questions[this.questionIndex];
    }
    
  }

  prevQuestion()
  {
    if(this.test?.questions)
      {
        if(this.questionIndex - 1 >= 0) this.questionIndex--;
        this.currentQuestion = this.test?.questions[this.questionIndex];
      }
  }
}
