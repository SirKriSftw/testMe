import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  constructor(private route: ActivatedRoute) {}

  ngOnInit()
  {
    console.log(history.state.results);
  }
}
