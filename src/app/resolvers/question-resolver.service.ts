import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { QuestionService } from '../services/question-service';
import { Question } from '../question-overview';

@Injectable({
  providedIn: 'root'
})
export class QuestionResolver implements Resolve<Map<string, Question[]>> {
  constructor(private questionService: QuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Map<string, Question[]>> {
    const examName = route.paramMap.get('exam');
    return new Observable(observer => {
      if (this.questionService.areQuestionsLoaded()) {
        observer.next(this.questionService.getQuestionsOfExam(examName ?? ""));
        observer.complete();
      }else {
        this.questionService.areQuestionsLoadedSubject().subscribe(loaded => {
          console.log('QuestionResolver.resolve');
          if (loaded) {
            observer.next(this.questionService.getQuestionsOfExam(examName ?? ""));
            observer.complete();
          }
        });
      }
    });
  }
}
