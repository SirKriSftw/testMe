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
  correctPercent: string = "";
  hideCorrect: boolean = false;
  hideWrong: boolean = false;

  constructor(private router: Router) {}

  ngOnInit()
  {
    this.results = history.state.results;
    if(this.results === undefined) this.router.navigate([""]);
    this.questionCount = this.results.wrongQuestions.length + this.results.correctQuestions.length;
    this.totalWrong = this.questionCount - this.results.totalCorrect;
    this.correctPercent = this.calculatePercent(this.results.totalCorrect);
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
        data: [this.totalWrong, this.results.totalCorrect],
        backgroundColor: [
          "#210B6F",
          "#730F9B"

        ],
        hoverOffset: 4,
        borderWidth: 2, 
        borderColor: '#210B6F'
      }]
    }

    const options = {
      responsive: true,
      plugins: 
      {
        legend: 
        {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: any) => {
              const dataset = data.datasets[tooltipItem.datasetIndex];
              const currentValue = dataset.data[tooltipItem.dataIndex];
              const percentage = this.calculatePercent(currentValue);
              return `  ${percentage}% (${currentValue})`;
            }
          }
        }
      }
    }

    this.chart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: options as any
    })
  }

  calculatePercent(nCorrect: number)
  {
    return ((nCorrect / this.questionCount) * 100).toFixed(2).replace(/\.?0*$/, '');
  }
}
