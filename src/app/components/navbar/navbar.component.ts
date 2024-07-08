import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoUrl = "assets/images/Logo.png";
  logoHoverUrl = "assets/images/LogoHover.png";
  isHovered = false;

  constructor(private dialogService: DialogService,
              private router: Router){}

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
    this.dialogService.openDialog("make");
  }

  goMine()
  {
    this.router.navigate(["profile"]);
  }
}
