import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { TestsService } from '../../services/tests.service';


@Component({
  selector: 'app-make',
  templateUrl: './make.component.html',
  styleUrl: './make.component.css'
})
export class MakeComponent {


  constructor(private authService: AuthenticationService,
              private testService: TestsService
  ){}
}
