import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../question-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-overview.component.html',
  styleUrl: './exam-overview.component.scss'
})
export class ExamOverviewComponent {

  constructor(private QuestionService: QuestionService, private _router: Router) { }

  get exams(): string[] {
    return this.QuestionService.getExams();
  }

  navigateToExam(exam: string): void {
    //Navigiere the browser zu /exam/{exam}
    this._router.navigateByUrl('/exam/' + exam);
  }
}
