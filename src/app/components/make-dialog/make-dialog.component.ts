import { Component } from '@angular/core';
import { TestsService } from '../../services/tests.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Cateogry } from '../../models/category';
import { User } from '../../models/user.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-make-dialog',
  templateUrl: './make-dialog.component.html',
  styleUrl: './make-dialog.component.css'
})
export class MakeDialogComponent {

  categories: Cateogry[] = [];
  loggedInUser?: User;

  constructor(public dialogRef: MatDialogRef<MakeDialogComponent>,
              private authService: AuthenticationService,
              private testService: TestsService){}
  
  ngOnInit()
  {
    this.authService.loggedInUser().subscribe(
      (r) => {
        this.loggedInUser = r;
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
    
  }
}
