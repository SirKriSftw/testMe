import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoUrl = "assets/images/Logo.png";
  logoHoverUrl = "assets/images/LogoHover.png";
  isHovered = false;

  constructor(private router: Router){}

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
    this.router.navigate(["create"]);
  }

  goMine()
  {
    this.router.navigate(["profile"]);
  }
}
