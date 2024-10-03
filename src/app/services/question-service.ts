import {HttpClient} from '@angular/common/http';

import {Question, QuestionOverview} from '../question-overview';
import {Injectable} from '@angular/core';
import {lastValueFrom, Observable, of, Subject} from 'rxjs';
import {Exam} from '../exam';
import {StorageService} from "./storage.service";

@Injectable({providedIn: 'root'})
export class QuestionService {
  constructor(private http: HttpClient, private storageService: StorageService) {
    console.log('constructor');
    this.loadQuestionOverview().then(() => {
        console.log(this.questionOverview);
        this.questionOverview
          .forEach(overview => this.loadQuestionsOfExam(overview.shortName)
            .then(questions => this.questions.set(overview.shortName, questions))
            .then(() => console.log('Loaded questions for ' + overview.shortName))
            .then(() => {
              if (this.questions.size === this.questionOverview.length) {
                console.log('All questions loaded');
                this.questionsLoaded = true;
                this.questionsLoadedSubject.next(true);
              }
            })
          );

      }
    );
  }

  private questionOverview: QuestionOverview[] = [];
  private questions: Map<String, Map<string, Question[]>> = new Map<String, Map<string, Question[]>>();
  private questionsLoaded: boolean = false;
  private questionsLoadedSubject: Subject<boolean> = new Subject<boolean>();


  private async loadQuestionOverview(): Promise<void> {
    console.log('loadQuestionOverview');
    try {
      const dataPromise = this.http.get<QuestionOverview[]>('https://thomaspohl.github.io/elwis-json/');
      const data = await lastValueFrom(dataPromise);
      this.questionOverview = data;
    } catch (err) {
      console.log(err);
    }
    console.log('complete');
  }

  getExams(): Exam[] {
    return this.questionOverview ? this.questionOverview.map(overview => new Exam(overview.name, overview.shortName)) : [];
  }

  getQuestionsOfExam(exam: string): Map<string, Question[]> {
    return this.questions.get(exam) || new Map<string, Question[]>();
  }


  async loadQuestionsOfExam(exam: string): Promise<Map<string, Question[]>> {
    console.log('loadQuestionsOfExam');
    let result: Map<string, Question[]> = new Map<string, Question[]>();
    const requests = this.questionOverview.find(overview => overview.shortName == exam)!.categories.map(category => {
      console.log('loadQuestionsOfExam ' + category.url);
      return this.http.get<Question[]>(category.url).toPromise()
        .then(data => {
          if (data) {
            result.set(category.name, data);
            console.log("Loaded " + data.length + " questions for " + category + " in " + exam);
            data.forEach(question => {
              //Load from storage
              this.storageService.getCorrectAnswerCount(exam, question.id)
              question.correctAnswer = 0;
            });
          }
        })
        .catch(err => console.log(err));
    });

    await Promise.all(requests);
    console.log('All requests complete');
    return result;
  };

  areQuestionsLoaded(): boolean {
    return this.questionsLoaded;
  }

  areQuestionsLoadedSubject(): Observable<boolean> {
   return this.questionsLoadedSubject.asObservable();
  }
}
