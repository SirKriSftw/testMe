import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Test } from '../../models/test.model';
import { TestsService } from '../../services/tests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../models/question.model';
import { Attempt } from '../../models/attempt.model';
import { TimerComponent } from '../timer/timer.component';
import { Choice } from '../../models/choice.model';
import { Result } from '../../models/result.model';
import { DialogService } from '../../services/dialog.service';


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
  questionPool: Question[] = [];
  id: number = -1;
  questionIndex = 0;
  currentQuestion?: Question = undefined;
  currentChoices?: Choice[] = [];
  currentQuestionTime?: number = undefined;
  currentAnswer?: string = undefined;
  questionCount: number = 0;

  canPrev: boolean = false;
  canNext: boolean = true;
  preventNext: boolean = false;

  constructor(private testsService: TestsService,
              private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router
  ) {}

  ngOnInit()
  {
    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.testsService.getTest(this.id).subscribe(
      (r) => {
        this.test = r;
        if(this.test?.questions)
        {
          this.questionPool = this.test.questions;
          this.questionCount = this.questionPool.length;
          this.options = history.state.info;
          if(this.options.questionTimer) this.currentQuestionTime = this.options.questionTimer;
          if(this.options.randomOrder) this.questionPool = this.shuffleOrder(this.questionPool);
          this.jumpToQuestion(this.questionIndex);
          console.log(this.options);
        } 
      }
    ); 
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
    this.updateAttemptInfo();
    let possibleNext = this.hasNext();
    if(this.preventNext || !this.canNext || possibleNext == -1) return;
    const check = this.checkAnswer();
    if(this.options.perfect && !check && check != undefined)
    {
      this.preventNext = true;

      setTimeout(() => {
        this.preventNext = false;
      }, 1000)
      
      return;
    }
    this.jumpToQuestion(possibleNext);
    this.updateButtons();
    this.loadAttemptInfo();
  }

  prevQuestion()
  {
    this.updateAttemptInfo();
    let possiblePrev = this.hasPrev();
    if(!this.canPrev || possiblePrev == -1) return;
    this.jumpToQuestion(possiblePrev);
    this.loadAttemptInfo();
    this.updateButtons();
  }

  jumpToQuestion(i: number)
  {
    this.updateAttemptInfo();
    this.questionIndex = i;
    this.currentQuestion = this.questionPool[this.questionIndex];
    if(this.currentQuestion.choices)
    {
      this.options.randomChoices ? this.currentChoices = this.shuffleOrder(this.currentQuestion.choices!) : this.currentChoices = this.currentQuestion.choices;
    } 
    else
    {
      this.currentChoices = [];
    }

    this.updateButtons();
    this.loadAttemptInfo();
  }

  updateButtons()
  {
    this.questionIndex == 0 ? this.canPrev = false : this.canPrev = true;
    this.questionIndex < this.questionCount - 1 || this.options.endless ? this.canNext = true : this.canNext = false;
  }

  updateAttemptInfo()
  {
    if(this.attemptInfo[this.questionIndex])
    {
      this.attemptInfo[this.questionIndex] = 
      {
        selectedAnswer: this.currentAnswer,
        isCorrect: this.checkAnswer(),
        timeRemaining: this.currentQuestionTimer ? this.currentQuestionTimer?.timeRemaining : undefined,
        disabled: this.attemptInfo[this.questionIndex].disabled
      }
    }
    else
    {
      this.attemptInfo[this.questionIndex] = 
      {
        selectedAnswer: this.currentAnswer,
        isCorrect: this.checkAnswer(),
        timeRemaining: this.currentQuestionTimer ? this.currentQuestionTimer?.timeRemaining : undefined,
        disabled: false
      }
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
  }

  checkAnswer()
  {
    if(this.currentQuestion?.choices != null || this.options.exact) return this.currentAnswer?.toLowerCase().trim() == this.currentQuestion?.answer.toLowerCase().trim();
    else return undefined;
  }

  async endTest()
  {
    console.log("test over");
    this.updateAttemptInfo();
    let results = await this.calculateScore();
    console.log(results);
    results.questions = this.sortResults(results.questions);
    this.router.navigate(["results"], { state: { results: results } });
  }

  sortResults(a: Result[])
  {
    a.sort((a, b) => a.questionIndex - b.questionIndex)
    return a;
  }

  async calculateScore()
  {
    let questions: Result[] = [];
    let results = {
      totalCorrect: 0,
      questions: questions,
    }
    const promises = this.attemptInfo.map(async (a, i) => {
      if (a.isCorrect === undefined) {
        let determinedCorrect = await this.openDialog({ userAnswer: a.selectedAnswer, setAnswer: this.questionPool[i].answer });
        a.isCorrect = determinedCorrect;
      } 
      if (a.isCorrect) results.totalCorrect++;
      questions.push({question: this.questionPool[i], userAnswer: a.selectedAnswer, questionIndex: i, isCorrect: this.attemptInfo[i].isCorrect!});
    });

    await Promise.all(promises);

    return results;
  }

  openDialog(data: any = undefined)
  {
    return new Promise<any> ((resolve, reject) => {
      this.dialogService.openDialog("check-answer", data).afterClosed().subscribe( determinedCorrect => {
        resolve(determinedCorrect);
      })
    })
  }

  forceMove()
  {
    this.updateAttemptInfo();
    this.attemptInfo[this.questionIndex].disabled = true;

    let possibleIndex = this.possibleQuestion();
    if(possibleIndex != -1) this.jumpToQuestion(possibleIndex);
    else this.endTest();
  }

  possibleQuestion()
  {
    let possibleIndex = this.hasNext();
    if(possibleIndex == -1) possibleIndex = this.hasPrev();
    else this.hasPrev();
    return possibleIndex;
  }

  hasNext()
  {
    if(this.options.endless && this.questionIndex == this.questionCount - 1) this.addMoreQuestions();
    let nextArray = this.attemptInfo.slice(this.questionIndex + 1);
    let possibleIndex = nextArray.findIndex(a => !a.disabled);
    if(possibleIndex != -1) possibleIndex = possibleIndex + this.questionIndex + 1;
    else if(this.attemptInfo.length < this.questionCount) possibleIndex = this.attemptInfo.length;
    if(possibleIndex == -1) this.canNext = false;
    return possibleIndex; 
  }

  hasPrev()
  {
    let prevArray = this.attemptInfo.slice(0, this.questionIndex);
    let possibleIndex = prevArray.reverse().findIndex(a => !a.disabled);
    if(possibleIndex != -1) possibleIndex = (prevArray.length - 1) - possibleIndex;
    else this.canPrev = false;
    return possibleIndex; 
  }

  addMoreQuestions()
  {
    if(this.options.randomOrder) this.questionPool = this.questionPool.concat(this.shuffleOrder(this.test?.questions!));
    else this.questionPool = this.questionPool.concat(this.test?.questions!);
    this.questionCount = this.questionPool.length;
  }

  // Fisher-Yates shuffle algorithm
  shuffleOrder<T>(a: T[]): T[]
  {
    const shuffledArray = [...a];

    for(let i = shuffledArray.length - 1; i > 0; i--)
    {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
  }
}
