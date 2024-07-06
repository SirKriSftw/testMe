import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Timer } from '../../models/timer.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  @Input() timeRemaining: number = 0;
  @Input() countdown: boolean = false;
  @Input() hidden: boolean = false;

  @Output() timerFinish = new EventEmitter();
  timerInterval: any;
  timer: Timer = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  ngOnInit() {
    this.timer = this.convertToTimer(this.timeRemaining);
    this.startTimer(this.countdown);
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
  }

  resetTimer()
  {
    clearInterval(this.timerInterval);
    this.timer = this.convertToTimer(this.timeRemaining);
    this.startTimer(this.countdown);
  }

  convertToTimer(minutes: number) : Timer
  {
    let tempTimer = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    tempTimer.hours = Math.floor(minutes / 60);
    tempTimer.minutes = Math.floor(minutes % 60);
    tempTimer.seconds = (minutes % 60 - Math.floor(minutes % 60)) * 100;
    if(tempTimer.minutes > 60)
    {
      tempTimer.hours = tempTimer.hours + Math.floor(tempTimer.minutes / 60);
      tempTimer.minutes = tempTimer.minutes % 60;
    }

    if(tempTimer.seconds > 60)
    {
      tempTimer.minutes = tempTimer.minutes + Math.floor(tempTimer.seconds / 60);
      tempTimer.seconds = tempTimer.seconds % 60;
    }
    tempTimer.minutes = Math.round(tempTimer.minutes);
    tempTimer.seconds = Math.round(tempTimer.seconds);

    return tempTimer;
  }

  startTimer(countdown: boolean = false) 
  {
    if(countdown)
    {
      this.timerInterval = setInterval(() => {
        if(this.timeRemaining < 1 && this.timer.seconds <= 0)
        {
          this.timerFinish.emit();
        }
        else
        {
          if(this.timer.seconds <= 0 && this.timer.minutes >= 1)
          {
            this.timer.seconds = 60;
            this.timer.minutes--;
            this.timeRemaining--;
          }
          if(this.timer.minutes <= 0 && this.timer.hours >= 1)
          {
            this.timer.minutes = 60;
            this.timer.hours--;
          }
          this.timer.seconds--;
          this.timeRemaining  = parseFloat((this.timeRemaining - 0.01).toFixed(2));
        }
      }, 1000)
    }
    else
    {
      this.timerInterval = setInterval(() => {
        this.timer.seconds++;
        if(this.timer.seconds === 60)
        {
          this.timer.seconds = 0;
          this.timer.minutes++;
        }
        if(this.timer.minutes === 60)
        {
          this.timer.minutes = 0;
          this.timer.hours++;
        }
      }, 1000)
    }
  }

}
