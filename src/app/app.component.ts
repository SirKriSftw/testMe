import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TestMe';
  showNav = true;

  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd)
      {
        this.showNav = !e.url.includes('/take/');
        this.showNav ? document.body.classList.remove('purple-background') : document.body.classList.add('purple-background');
      }
    })
  }
}
