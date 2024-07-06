import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  @ViewChild("resultsChart") resultsChart!: ElementRef;
  chart: any;

  results: any = {};
  questionCount: number = 0;
  totalWrong: number = 0;
  hideCorrect: boolean = false;
  hideWrong: boolean = false;

  constructor(private router: Router) {}

  ngOnInit()
  {
    this.results = history.state.results;
    if(this.results === undefined) this.router.navigate([""]);
    this.questionCount = this.results.wrongQuestions.length + this.results.correctQuestions.length;
    this.totalWrong = this.questionCount - this.results.totalCorrect;
  }

  ngAfterViewInit()
  {
    const ctx = this.resultsChart.nativeElement.getContext("2d");

    const data = {
      labels: [
        'Wrong',
        'Correct'
      ],
      datasets: [{
        label: "Total",
        data: [this.totalWrong, this.results.totalCorrect],
        backgroundColor: [
          "red",
          "green"
        ],
        hoverOffset: 4
      }],
    }

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        }
      }
    }

    this.chart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options
    })

  }
}
