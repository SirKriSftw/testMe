import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TestsService } from '../../services/tests.service';
import { Cateogry } from '../../models/category';


@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrl: './make.component.css'
})
export class MakeComponent {

  categories: Cateogry[] = [];

  constructor(private authService: AuthenticationService,
              private testService: TestsService
  ){}

  ngOnInit()
  {

  }
}
