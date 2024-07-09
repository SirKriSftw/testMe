import { Component, ComponentRef, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
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

  @HostListener("document:keyup", ["$event"])
  addKeyUp(e: KeyboardEvent)
  {
    if(e.key === "+" && this.isCreator())
    {
      this.newQuestion();
    } 
  }

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

  getTestInfo()
  {
    this.testsService.getTest(this.id!).subscribe(
      (r) => {
        this.test = r;
        this.unloadQuestions();
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

  takeTest()
  {
    this.dialogService.openDialog("take-test").afterClosed().subscribe(r => {
      if(r != undefined) this.router.navigate(["/take/test/" + this.test?.testId], { state: { info: r }});
    })
  }

  isCreator()
  {
    return this.loggedInId == this.test?.creatorId;
  }

  toggleAnswers()
  {
    
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
      this.loadQuestion(r, this.test!.questions!.length - 1);
    })
    newQ.instance.questionCancelled.subscribe(() => {
      newQ.destroy();
    })
  }

  unloadQuestions()
  {
    this.questionsContainer.clear();
  }

  loadQuestion(question: Question, i: number)
  {
    if(!this.test?.questions) return;

    const questionCard = this.questionsContainer.createComponent(QuestionCardComponent);
    this.questionsContainer.move(questionCard.hostView, i);

    this.setupComponent(question, i, questionCard);
  }

  setupComponent(question: Question, i: number, questionCard: ComponentRef<QuestionCardComponent>)
  {
    this.loadInfo(question, i, questionCard);
    this.handleEditing(question, questionCard);
  }

  loadInfo(question: Question, i: number, questionCard: ComponentRef<QuestionCardComponent>)
  {
    questionCard.instance.question = question;
    questionCard.instance.index = i;
    questionCard.instance.hideAnswers = this.hideAnswers;
    questionCard.instance.canEdit = this.isCreator();
  }

  handleEditing(question: Question, questionCard: ComponentRef<QuestionCardComponent>)
  {
    questionCard.instance.editingQuestion.subscribe(
      (qInfo) => {
        this.makeEditComponent(qInfo, question, questionCard)
      }
    );
  }

  makeEditComponent(qInfo: any, question: Question, questionCard: ComponentRef<QuestionCardComponent>)
  {
    // Get information about question and its index from editingQuestion event in question card component
    const questionToEdit = qInfo[0];
    const questionIndex = qInfo[1];

    // Swap question card with new question component
    const editQ = this.questionsContainer.createComponent(NewQuestionComponent);
    this.questionsContainer.move(editQ.hostView, questionIndex);
    editQ.instance.questionToEdit = questionToEdit;
    editQ.instance.testId = questionToEdit.testId;
    questionCard.destroy();

    this.handleEditEvents(questionIndex, question, editQ);
  }

  handleEditEvents(index: number, question: Question, editQ: ComponentRef<NewQuestionComponent>)
  {
    // Keep track before editing in case of cancel
    const originalQuestion: Question = { ...question};
    if(question.choices?.length) originalQuestion.choices = [...question.choices];

    editQ.instance.questionEdited.subscribe(
      (r) => {
        this.test!.questions![index] = question;
        console.log("Saving edit...");
        console.log(r);
        this.loadQuestion(r, index);
        editQ.destroy();
      }
    );

    editQ.instance.questionCancelled.subscribe(() => {
      this.loadQuestion(originalQuestion, index);
      editQ.destroy();
    });

    editQ.instance.questionDeleted.subscribe((r) => {
      this.test!.questions = this.test?.questions?.filter(q => q.questionId == r);
      this.getTestInfo();
      editQ.destroy();
    });
  }

  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }
}
