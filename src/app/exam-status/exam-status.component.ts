import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogoComponent} from "../logo/logo.component";
import {QuestionService} from "../services/question-service";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-exam-status',
  standalone: true,
    imports: [CommonModule, LogoComponent],
  templateUrl: './exam-status.component.html',
  styleUrl: './exam-status.component.scss'
})
export class ExamStatusComponent {
  @Input() examName: string = ''; // Add this line to accept examName as input

  constructor(private questionService: QuestionService,
              private storageService: StorageService) {
  }

  getGreenCount(): number {
    let greenCount = 0;
    this.questionService.getQuestionsOfExam(this.examName)
      .forEach((questions, category )=>{
        //filter questions with correctAnswer > 3
        greenCount += questions.filter(question => question.correctAnswer >= 3).length;
      });
    return greenCount;
  }

  getYellowCount(): number {
    let yellowCount = 0;
    this.questionService.getQuestionsOfExam(this.examName)
      .forEach((questions, category )=>{
        //filter questions with correctAnswer > 3
        yellowCount += questions.filter(question => question.correctAnswer > 0 &&  question.correctAnswer<3).length;
      });
    return yellowCount;
  }

  getRedCount(): number {
    let redCount = 0;
    this.questionService.getQuestionsOfExam(this.examName)
      .forEach((questions, category )=>{
        //filter questions with correctAnswer > 3
        redCount += questions.filter(question => question.correctAnswer ==0).length;
      });
    return redCount;
  }


}
