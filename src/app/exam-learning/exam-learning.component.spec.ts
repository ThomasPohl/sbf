import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamLearningComponent } from './exam-learning.component';

describe('ExamLearningComponent', () => {
  let component: ExamLearningComponent;
  let fixture: ComponentFixture<ExamLearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamLearningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
