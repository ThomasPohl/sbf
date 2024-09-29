import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question-service';
import { Question } from '../question-overview';
import { materialize } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {LogoComponent} from "../logo/logo.component";

@Component({
  selector: 'app-exam-learning',
  standalone: true,
  imports: [CommonModule, FormsModule, LogoComponent],
  templateUrl: './exam-learning.component.html',
  styleUrl: './exam-learning.component.scss'
})
export class ExamLearningComponent implements OnInit {
  examName: string | null = null;
  currentQuestion: Question | null = null;
  phase: string = 'showQuestion';
  selectedAnswer: number | null = null;

  constructor(private activatedRoute: ActivatedRoute, private _router: Router, private questionService: QuestionService) {
    this.activatedRoute.params.subscribe(params => {
      this.examName = params['exam'];
      this.nextQuestion();
    });
  }

  randomQuestion(): Question {
    const categories = this.getQuestionCategories();
    const category = categories[Math.floor(Math.random() * categories.length)];
    const questions = this.getQuestionsOfCategory(category);
    let result = questions[Math.floor(Math.random() * questions.length)];

    this.shuffle(result);

    return result;
  }


  /**
   *
   * @param question Shuffle the answers of the question
   * The former correct answer is saved in question.correctAnswer and needs to be updated to the new index
   */
  shuffle(question: Question ) {
    const correctAnswer = question.answers[question.correctAnswer];

    let shuffeledAnswers = [];
    while (question.answers.length > 0) {
      const index = Math.floor(Math.random() * question.answers.length);
      shuffeledAnswers.push(question.answers[index]);
      question.answers.splice(index, 1);
    }
    question.answers = shuffeledAnswers;
    question.correctAnswer = question.answers.indexOf(correctAnswer);
  }

  ngOnInit(): void {
    if (this.examName != null) {
      this.questionService.getQuestionsOfExam(this.examName);
    }
  }

  getQuestionCategories(): string[] {
    console.log('getQuestionCategories for ' + this.examName);
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

  selectAnswer(answer: number): boolean {

    if (this.phase != 'showQuestion') {
      console.log('selectAnswer ignored');
      return false;
    }
    if (this.selectedAnswer == answer) {
      this.checkAnswer();
    } else {
      this.selectedAnswer = answer;
    }
    return true;
  }

  checkAnswer(): void {
    if (this.selectedAnswer == this.currentQuestion?.correctAnswer) {
      this.phase = 'correct';
    } else {
      this.phase = 'wrong';
    }
  }
  nextQuestion(): void {
    this.currentQuestion = this.randomQuestion();
    this.phase = 'showQuestion';
    this.selectedAnswer = null;
  }




}
