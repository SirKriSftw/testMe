import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { Test } from '../../models/test.model';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoUrl = "assets/images/Logo.png";
  logoHoverUrl = "assets/images/LogoHover.png";
  isHovered = false;

  loggedInUser?: User;

  constructor(private dialogService: DialogService,
              private authService: AuthenticationService,
              private testsService: TestsService,
              private router: Router){}
  
  ngOnInit()
  {
    this.authService.loggedInUser().subscribe(
      (r) => {
        this.loggedInUser = r;
      }
    );
  }

  goHome()
  {
    this.router.navigate(["home"]);
  }

  goFind()
  {
    this.router.navigate(["tests"]);
  }

  goMake()
  {
    if(this.loggedInUser)
    {
      this.dialogService.openDialog("make").afterClosed().subscribe(
        (r) => {
          if(r != undefined)
          {
            this.testsService.saveTest(r).subscribe(
              (r) => {
                this.router.navigate(["test", r.testId]);
              }
            );            
          }
        }
      );
    }
    else
    {
      this.router.navigate(["login"]);
    } 
  }

  goMine()
  {
    this.loggedInUser ? this.router.navigate(["profile"]) : this.router.navigate(["login"]);
  }
}
