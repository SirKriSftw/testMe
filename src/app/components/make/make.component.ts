import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TestsService } from '../../services/tests.service';
import { Cateogry } from '../../models/category';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrl: './make.component.css'
})
export class MakeComponent {

  categories: Cateogry[] = [];
  loggedInUser?: User;

  constructor(private authService: AuthenticationService,
              private testService: TestsService
  ){}

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

  
}
