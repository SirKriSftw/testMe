import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

// Services
import { TestsService } from './services/tests.service';
import { QuestionsService } from './services/questions.service';
import { DialogService } from './services/dialog.service';
import { AuthenticationService } from './services/authentication.service';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TestComponent } from './components/test/test.component';
import { TestsComponent } from './components/tests/tests.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { TakeTestDialogComponent } from './components/take-test-dialog/take-test-dialog.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { TimerComponent } from './components/timer/timer.component';
import { CheckAnswerDialogComponent } from './components/check-answer-dialog/check-answer-dialog.component';
import { ResultsComponent } from './components/results/results.component';
import { QuestionCardComponent } from './components/question-card/question-card.component';
import { MakeDialogComponent } from './components/make-dialog/make-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TestComponent,
    TestsComponent,
    NewQuestionComponent,
    TakeTestDialogComponent,
    TakeTestComponent,
    TimerComponent,
    CheckAnswerDialogComponent,
    ResultsComponent,
    QuestionCardComponent,
    MakeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    TestsService,
    QuestionsService,
    DialogService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
