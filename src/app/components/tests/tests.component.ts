import { Component } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent {

    tests: Test[] = [];
    constructor( private testsService: TestsService) {}

    ngOnInit()
    {
      this.testsService.getAllTests().subscribe(
        (r) => {
          this.tests = r;
        }
      );
    }
}
