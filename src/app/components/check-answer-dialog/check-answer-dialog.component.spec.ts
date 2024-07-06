import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAnswerDialogComponent } from './check-answer-dialog.component';

describe('CheckAnswerDialogComponent', () => {
  let component: CheckAnswerDialogComponent;
  let fixture: ComponentFixture<CheckAnswerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckAnswerDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckAnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
