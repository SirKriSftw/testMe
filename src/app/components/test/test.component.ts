import { Component, HostListener, ViewChild, ViewContainerRef } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { Test } from '../../models/test.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NewQuestionComponent } from '../new-question/new-question.component';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  @ViewChild('new_question', { read: ViewContainerRef }) questionContainer!: ViewContainerRef;

  test?: Test;
  id?: number;
  hideAnswers: boolean = true;
  hasQuestions: boolean = false;
  addKeyPress: boolean = false;

  constructor(private testsService: TestsService,
              private dialogService: DialogService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  ngOnInit()
  {
    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.testsService.getTest(this.id).subscribe(
      (r) => {
        this.test = r;
        if(this.test?.questions)
        {
          if(this.test.questions.length > 0) this.hasQuestions = true;
        }
        else if(this.test == undefined)
        {
          this.router.navigate(["tests"]);
        }
      }
    );
  }

  @HostListener("document:keydown", ["$event"])
  addKeyDown(e: KeyboardEvent)
  {
    if(e.key === "+" && !this.addKeyPress)
    {
      this.addKeyPress = true;
      this.newQuestion();
    }
  }

  @HostListener("document:keyup", ["$event"])
  addKeyUp(e: KeyboardEvent)
  {
    if(e.key === "+") this.addKeyPress = false;
  }


  choiceLabel(i: number)
  {
    const asciiA = "a".charCodeAt(0);
    const asciiValue = i + asciiA;
    const optionLetter = String.fromCharCode(asciiValue);

    return `${optionLetter}.`
  }

  newQuestion()
  {
    const newQ = this.questionContainer.createComponent(NewQuestionComponent);
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

  openDialog()
  {
    this.dialogService.openDialog().afterClosed().subscribe(r => {
      if(r != undefined) this.router.navigate(["/take/test/" + this.test?.id], { state: { info: r }});
    })
  }
}
