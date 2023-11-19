import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question-service';
import { Question } from '../question-overview';

@Component({
  selector: 'app-exam-learning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-learning.component.html',
  styleUrl: './exam-learning.component.scss'
})
export class ExamLearningComponent implements OnInit {
  examName: string | null = null;
  constructor(private activatedRoute: ActivatedRoute, private _router: Router, private questionService: QuestionService) {
    this.activatedRoute.params.subscribe(params => {
      this.examName = params['exam'];
    });
  }

  ngOnInit(): void {
    if (this.examName != null) {
      this.questionService.getQuestionsOfExam(this.examName);
    }
  }

  getQuestionCategories(): string[] {
    if (this.examName == null) {
      return [];
    } else {
      return Array.from(this.questionService.getQuestionsOfExam(this.examName)?.keys()|| []) ;
    }
  }

  getQuestionsOfCategory(category: string): Question[] {
    if (this.examName == null) {
      return [];
    } else {
      return this.questionService.getQuestionsOfExam(this.examName).get(category) || [];
    }
  }



}
