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
    displayTests: Test[] = [];
    searchText: string = "";
    category: string = "0";

    constructor( private testsService: TestsService) {}

    ngOnInit()
    {
      this.testsService.getAllTests().subscribe(
        (r) => {
          this.tests = r;
          this.displayTests = this.tests;
        }
      );
    }

    search()
    {
      if(this.category == "0")
      {
        this.displayTests = this.tests.filter(t => t.title.toLowerCase().includes(this.searchText.toLowerCase()));
      }
      else
      {
        this.displayTests = this.tests.filter(t => t.title.toLowerCase().includes(this.searchText.toLowerCase()) && t.categoryId == parseInt(this.category));
      }

      this.searchText = "";
      this.category = "0";
    }
}
