import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

getCorrectAnswerCount(exam: string, questionId: string): number {
  const key = `exam_${exam}_question_${questionId}_correct_count`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

resetCorrectAnswerCount(exam: string, questionId: string): void {
  const key = `exam_${exam}_question_${questionId}_correct_count`;
  localStorage.setItem(key, "0");
}

incrementCorrectAnswerCount(exam: string, questionId: string): void {
  const key = `exam_${exam}_question_${questionId}_correct_count`;
  const count = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, (count + 1).toString());
}

}
