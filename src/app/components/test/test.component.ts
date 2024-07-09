import { Component, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { Test } from '../../models/test.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewQuestionComponent } from '../new-question/new-question.component';
import { DialogService } from '../../services/dialog.service';
import { AuthenticationService } from '../../services/authentication.service';
import { QuestionCardComponent } from '../question-card/question-card.component';
import { Question } from '../../models/question.model';
import { Choice } from '../../models/choice.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  @ViewChild('new_question', { read: ViewContainerRef }) newQuesitonContainer!: ViewContainerRef;
  @ViewChild('questions', { read: ViewContainerRef }) questionsContainer!: ViewContainerRef;

  test?: Test;
  id?: number;
  loggedInId?: number;
  hideAnswers: boolean = true;
  hasQuestions: boolean = false;

  constructor(private testsService: TestsService,
              private dialogService: DialogService,
              private authService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit()
  {
    this.authService.loggedInUser().subscribe(
      (r) => {
        this.loggedInId = r?.id;
      }
    );

    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.route.paramMap.subscribe(p => {
      const urlID = p.get("id");
      if(urlID) this.id = parseInt(urlID);
      if(this.id) this.getTestInfo();
    });
  }

  @HostListener("document:keyup", ["$event"])
  addKeyUp(e: KeyboardEvent)
  {
    if(e.key === "+" && this.isCreator())
    {
      this.newQuestion();
    } 
  }

  getTestInfo()
  {
    this.testsService.getTest(this.id!).subscribe(
      (r) => {
        this.test = r;
        if(!this.test?.isPublic && !this.isCreator()) this.router.navigate(["tests"]);
        if(this.test == undefined) this.router.navigate(["tests"]);

        if(this.test?.questions)
        {
          if(this.test.questions.length > 0) this.hasQuestions = true;
          if(this.hasQuestions)
          {
            this.test.questions.forEach((q, i) => {
              this.loadQuestion(q, i);
            })
          }
        }
      },
      (e) => {
        this.router.navigate(["tests"]);
      }
    );
  }

  isCreator()
  {
    return this.loggedInId == this.test?.creatorId;
  }

  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  loadQuestion(question: Question, i: number)
  {
    const originalQuestion: Question = { ...question};
    if(question.choices) originalQuestion.choices = [...question.choices];
    

    const questionCard = this.questionsContainer.createComponent(QuestionCardComponent);
    this.questionsContainer.move(questionCard.hostView, i);
    if(this.test?.questions)
    {
      questionCard.instance.question = question;
      questionCard.instance.index = i;
      questionCard.instance.hideAnswers = this.hideAnswers;
      questionCard.instance.canEdit = this.isCreator();
      questionCard.instance.editingQuestion.subscribe(
        (r) => {
          
          const editQ = this.questionsContainer.createComponent(NewQuestionComponent);
          this.questionsContainer.move(editQ.hostView, r[1]);
          editQ.instance.questionToEdit = r[0];
          editQ.instance.testId = r[0].testId;
          questionCard.destroy();
          editQ.instance.questionEdited.subscribe(
            (r) => {
              this.test!.questions![i] = question;
              console.log("Saving edit...");
              console.log(r);
              this.loadQuestion(r, i);
              editQ.destroy();
            }
          );

          editQ.instance.questionCancelled.subscribe(() => {
            console.log(originalQuestion);
            this.loadQuestion(originalQuestion, i)
            editQ.destroy();
          })
          
        }
      );
    }
    
  }

  newQuestion()
  {
    const newQ = this.newQuesitonContainer.createComponent(NewQuestionComponent);
    newQ.instance.testId = this.id!;

    newQ.instance.questionSaved.subscribe((r) => {
      if(!this.test?.questions) this.test!.questions = [];
      this.test?.questions?.push(r);
      console.log(r);
      this.hasQuestions = true;
      newQ.destroy();
    })
    newQ.instance.questionCancelled.subscribe(() => {
      newQ.destroy();
    })
  }

  takeTest()
  {
    this.dialogService.openDialog("take-test").afterClosed().subscribe(r => {
      if(r != undefined) this.router.navigate(["/take/test/" + this.test?.testId], { state: { info: r }});
    })
  }
}
