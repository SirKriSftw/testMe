import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { TestsComponent } from './components/tests/tests.component';
import { TakeTestComponent } from './components/take-test/take-test.component';

const routes: Routes = [
  {path: "home", component: HomeComponent, title: "Home"},
  {path: "tests", component: TestsComponent, title: "Tests"},
  {path: "test/:id", component: TestComponent, title: "Test"},
  {path: "take/test/:id", component: TakeTestComponent, title: "Taking Test"},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
