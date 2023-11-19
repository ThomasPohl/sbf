import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamStatusComponent } from './exam-status.component';

describe('ExamStatusComponent', () => {
  let component: ExamStatusComponent;
  let fixture: ComponentFixture<ExamStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
