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
  chart?: Chart<"pie", any[], string>;

  results: any = {};
  displayQuestions: Result[] = [];
  questionCount: number = 0;
  totalWrong: number = 0;
  correctPercent: string = "";
  showCorrect: boolean = false;
  showIncorrect: boolean = true;
  canUpdateChart: boolean = false;

  constructor(private router: Router) {}

  ngOnInit()
  {
    this.results = history.state.results;
    if(this.results === undefined) this.router.navigate([""]);
    this.questionCount = this.results.questions.length;
    this.totalWrong = this.questionCount - this.results.totalCorrect;
    this.correctPercent = this.calculatePercent(this.results.totalCorrect);
    this.updateDisplay();
  }

  ngAfterViewInit()
  {
    this.createChart();
    this.canUpdateChart = true;
    this.updateDisplay();
  }

  retakeTest() 
  {
    const testId = this.results.questions[0].question.testId;
    this.router.navigate(["test/" + testId])
  }

  updateDisplay()
  {
    if(this.showCorrect && this.showIncorrect) this.displayQuestions = this.results.questions;
    else if(!this.showCorrect && !this.showIncorrect) this.displayQuestions = [];
    else if (!this.showCorrect) this.displayQuestions = this.results.questions.filter((q: any) => !q.isCorrect);
    else if (!this.showIncorrect) this.displayQuestions = this.results.questions.filter((q: any) => q.isCorrect);

    if(this.canUpdateChart) this.updateChart();
  }
  
  calculatePercent(nCorrect: number)
  {
    return ((nCorrect / this.questionCount) * 100).toFixed(2).replace(/\.?0*$/, '');
  }

  updateChart()
  {
    const colors = [];

    if(this.showIncorrect)
    {
      colors.push("#210B6F");
    }
    else
    {
      colors.push("#A2BAF6"); 
    }
    if(this.showCorrect)
    {
      colors.push("#730F9B");
    }
    else
    {
      colors.push("#A2BAF6"); 
    }

    this.chart!.data.datasets[0].backgroundColor = colors;
    this.chart!.update();
  }

  createChart()
  {
    const ctx = this.resultsChart.nativeElement.getContext("2d");

    const data = {
      labels: [
        'Wrong',
        'Correct'
      ],
      datasets: [{
        data: [
          this.totalWrong, 
          this.results.totalCorrect
        ],
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
}
