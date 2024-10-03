import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../services/question-service';
import { Router } from '@angular/router';
import { Exam } from '../exam';
import {LogoComponent} from "../logo/logo.component";

@Component({
  selector: 'app-exam-overview',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './exam-overview.component.html',
  styleUrl: './exam-overview.component.scss'
})
export class ExamOverviewComponent {

  constructor(private QuestionService: QuestionService, private _router: Router) { }

  get exams(): Exam[] {
    return this.QuestionService.getExams();
  }

  navigateToExam(exam: string): void {
    //Navigiere the browser zu /exam/{exam}
    this._router.navigateByUrl('/exam/' + exam);
  }
}
