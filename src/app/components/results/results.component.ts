import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { Result } from '../../models/result.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {

  @ViewChild("resultsChart") resultsChart!: ElementRef;
  chart: any;

  results: any = {};
  displayQuestions: Result[] = [];
  questionCount: number = 0;
  totalWrong: number = 0;
  correctPercent: string = "";
  showCorrect: boolean = true;
  showIncorrect: boolean = true;

  constructor(private router: Router) {}

  ngOnInit()
  {
    this.results = history.state.results;
    if(this.results === undefined) this.router.navigate([""]);
    this.questionCount = this.results.questions.length;
    this.totalWrong = this.questionCount - this.results.totalCorrect;
    this.correctPercent = this.calculatePercent(this.results.totalCorrect);
    this.updateDisplay();
    console.log(this.results)
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

  updateDisplay()
  {
    if(this.showCorrect && this.showIncorrect) this.displayQuestions = this.results.questions;
    else if(!this.showCorrect && !this.showIncorrect) this.displayQuestions = [];
    else if (!this.showCorrect)
    {
      this.displayQuestions = this.results.questions.filter((q: any) => !q.isCorrect);
    }
    else if (!this.showIncorrect)
    {
      this.displayQuestions = this.results.questions.filter((q: any) => q.isCorrect);
    }
  }

  calculatePercent(nCorrect: number)
  {
    return ((nCorrect / this.questionCount) * 100).toFixed(2).replace(/\.?0*$/, '');
  }
}
