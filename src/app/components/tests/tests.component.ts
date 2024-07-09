import { Component } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { Test } from '../../models/test.model';
import { Router } from '@angular/router';
import { Cateogry } from '../../models/category';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.css'
})
export class TestsComponent {

    tests: any[] = [];
    displayTests: Test[] = [];
    searchText: string = "";
    category: string = "0";
    categories: Cateogry[] = [];

    constructor(private testsService: TestsService,
                private router: Router
    ) {}

    ngOnInit()
    {
      this.testsService.getAllTestNames().subscribe(
        (r) => {
          this.tests = r;
          this.displayTests = this.tests;
        }
      );

      this.testsService.getAllCategories().subscribe(
        (r) => {
          this.categories = r;
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
    }

    goToTest(id: number)
    {
      this.router.navigate(["/test/" + id]);
    }
}
