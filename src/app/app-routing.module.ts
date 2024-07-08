import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { TestsComponent } from './components/tests/tests.component';
import { TakeTestComponent } from './components/take-test/take-test.component';
import { ResultsComponent } from './components/results/results.component';
import { MakeComponent } from './components/make/make.component';

const routes: Routes = [
  {path: "home", component: HomeComponent, title: "Home"},
  {path: "tests", component: TestsComponent, title: "Tests"},
  {path: "test/:id", component: TestComponent, title: "Test"},
  {path: "take/test/:id", component: TakeTestComponent, title: "Taking Test"},
  {path: "make", component: MakeComponent, title: "Making Test"},
  {path: "results", component: ResultsComponent, title: "Test Results"},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
