import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeTestDialogComponent } from './take-test-dialog.component';

describe('TakeTestDialogComponent', () => {
  let component: TakeTestDialogComponent;
  let fixture: ComponentFixture<TakeTestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TakeTestDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TakeTestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
