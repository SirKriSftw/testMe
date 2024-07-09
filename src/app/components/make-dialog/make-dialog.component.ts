import { Component } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Cateogry } from '../../models/category';
import { User } from '../../models/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Test } from '../../models/test.model';

@Component({
  selector: 'app-make-dialog',
  templateUrl: './make-dialog.component.html',
  styleUrl: './make-dialog.component.css'
})
export class MakeDialogComponent {

  categories: Cateogry[] = [];
  test: Test = {
    testId: -1,
    creatorId: 0,
    categoryId: 0,
    title: "",
    description: "",
    isPublic: false
  }

  error: string = "Title is required when making a test.";
  hasError: boolean = false;

  constructor(public dialogRef: MatDialogRef<MakeDialogComponent>,
              private authService: AuthenticationService,
              private testService: TestsService){}
  
  ngOnInit()
  {
    this.authService.loggedInUser().subscribe(
      (r) => {
        if(r != undefined) this.test.creatorId = r.id;
      }
    );

    this.testService.getAllCategories().subscribe(
      (r) => {
        this.categories = r;
      }
    );
  }
  
  makeTest()
  {
    this.test.title === "" ? this.hasError = true : this.hasError = false;
    if(!this.hasError) this.dialogRef.close(this.test);
  }
}
