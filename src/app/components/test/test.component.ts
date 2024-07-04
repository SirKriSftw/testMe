import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { Test } from '../../models/test.model';
import { ActivatedRoute } from '@angular/router';
import { NewQuestionComponent } from '../new-question/new-question.component';

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
              private route: ActivatedRoute
  ){}

  ngOnInit()
  {
    this.id = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.testsService.getTest(this.id).subscribe(
      (r) => {
        this.test = r;
      }
    );
  }

  newQuestion()
  {
    const newQ = this.questionContainer.createComponent(NewQuestionComponent);
    newQ.instance.testId = this.id!;
  }
}
