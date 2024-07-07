import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  logoUrl = "assets/images/Logo.png";

  constructor(private router: Router){}

  goHome()
  {
    this.router.navigate(["home"]);
  }
}
