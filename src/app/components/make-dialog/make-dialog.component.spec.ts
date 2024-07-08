import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDialogComponent } from './make-dialog.component';

describe('MakeDialogComponent', () => {
  let component: MakeDialogComponent;
  let fixture: ComponentFixture<MakeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
