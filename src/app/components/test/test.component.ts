import { Component, ViewChild, ViewContainerRef } from '@angular/core';
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
        if(this.test == undefined)
        {
          this.router.navigate(["tests"]);
        }
      }
    );
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
      this.test?.questions?.push(r);
      newQ.destroy();
    })
    newQ.instance.questionCancelled.subscribe(() => {
      newQ.destroy();
    })
  }

  openDialog()
  {
    this.dialogService.openDialog().afterClosed().subscribe(r => {
      console.log(r);
    })
  }
}
