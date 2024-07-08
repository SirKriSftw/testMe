import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { Test } from '../../models/test.model';

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
  madeTest?: Test;

  constructor(private dialogService: DialogService,
              private authService: AuthenticationService,
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
            this.madeTest = r;
            const id = 1;// Save test to DB here and capture the id
            this.router.navigate(["test/" + id]);
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
