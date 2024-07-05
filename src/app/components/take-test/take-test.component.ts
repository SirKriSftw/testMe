import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestsService } from '../../services/tests.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../../models/question.model';
import { Attempt } from '../../models/attempt.model';
import { TimerComponent } from '../timer/timer.component';


@Component({
  selector: 'app-take-test',
  templateUrl: './take-test.component.html',
  styleUrl: './take-test.component.css'
})
export class TakeTestComponent {

  @ViewChild('longAnswer') longAnswer?: ElementRef;
  @ViewChild('currentQuestionTimer') currentQuestionTimer?: TimerComponent;

  options: any = {};
  attemptInfo: Attempt[] = [];
  test?: Test = undefined;
  id: number = -1;
  questionIndex = 0;
  currentQuestion?: Question = undefined;
  currentQuestionTime?: number = undefined;
  currentAnswer?: string = undefined;
  questionCount: number = 0;

  canPrev: boolean = false;
  canNext: boolean = true;
  preventNext: boolean = false;

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
        if(this.test?.questions) this.questionCount = this.test.questions.length;
      }
    );
    this.options = history.state.info;
    if(this.options.questionTimer) this.currentQuestionTime = this.options.questionTimer;
  }


  @HostListener("document:keydown.ArrowLeft", ["$event"])
  @HostListener("document:keydown.ArrowDown", ["$event"])
  keyPrev(e: KeyboardEvent)
  {
    if(this.longAnswer?.nativeElement !== document.activeElement) this.prevQuestion();
  }

  @HostListener("document:keydown.ArrowRight", ["$event"])
  @HostListener("document:keydown.ArrowUp", ["$event"])
  keyNext(e: KeyboardEvent)
  {
    if(this.longAnswer?.nativeElement !== document.activeElement) this.nextQuestion();
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
    if(this.preventNext || !this.canNext) return;
    if(this.options.perfect && !this.checkAnswer())
    {
      this.preventNext = true;

      setTimeout(() => {
        this.preventNext = false;
      }, 1000)
      
      return;
    }
    
    this.updateAttemptInfo();
    if(this.test?.questions)
    {
      if(this.questionIndex + 1 < this.test?.questions.length) this.questionIndex++;
      this.currentQuestion = this.test?.questions[this.questionIndex];
    }
    this.updateButtons();
    this.loadAttemptInfo();
  }

  prevQuestion()
  {
    if(!this.canPrev) return;
    this.updateAttemptInfo();
    if(this.test?.questions)
    {
      if(this.questionIndex - 1 >= 0) this.questionIndex--;
      this.currentQuestion = this.test?.questions[this.questionIndex];
    }
    this.loadAttemptInfo();
    this.updateButtons();
  }

  updateButtons()
  {
    this.questionIndex == 0 ? this.canPrev = false : this.canPrev = true;
    this.questionIndex < this.questionCount - 1 ? this.canNext = true : this.canNext = false;
  }

  updateAttemptInfo()
  {
    this.attemptInfo[this.questionIndex] = 
    {
      selectedAnswer: this.currentAnswer,
      isCorrect: this.checkAnswer(),
      timeRemaining: this.currentQuestionTimer ? this.currentQuestionTimer?.timeRemaining : undefined
    }
  }

  loadAttemptInfo()
  {
    if(this.attemptInfo[this.questionIndex])
    {
      this.currentAnswer = this.attemptInfo[this.questionIndex].selectedAnswer;
      if (this.currentQuestionTimer)
      {
        this.currentQuestionTime = this.attemptInfo[this.questionIndex].timeRemaining;
        this.currentQuestionTimer!.timeRemaining = this.currentQuestionTime!;
        this.currentQuestionTimer?.resetTimer();
      } 
    }
    else
    {
      this.currentAnswer = "";
      if(this.currentQuestionTimer)
      {
        this.currentQuestionTimer!.timeRemaining = this.options.questionTimer;
        this.currentQuestionTimer?.resetTimer();
      }
    }
    console.log(this.currentQuestionTimer!.timeRemaining);
  }

  checkAnswer()
  {
    if(this.currentQuestion?.choices != null || this.options.exact) return this.currentAnswer?.toLowerCase().trim() == this.currentQuestion?.answer.toLowerCase().trim();
    else return undefined;
  }

  endTest()
  {
    console.log("test over");
  }

  disableAnswers()
  {
    if(this.canNext) this.nextQuestion();
  }

}
