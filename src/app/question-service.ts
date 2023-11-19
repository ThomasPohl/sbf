import { HttpClient } from '@angular/common/http';

import { Question, QuestionOverview } from './question-overview';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    constructor(private http: HttpClient) {
        console.log('constructor');
        this.loadQuestionOverview().then(() => {
            console.log(this.questionOverview);
            this.questionOverview.forEach(overview => this.loadQuestionsOfExam(overview.name).then(questions => this.questions.set(overview.name, questions)));
        }
        );
    }

    private questionOverview: QuestionOverview[] = [];
    private questions: Map<String, Map<string, Question[]>> = new Map<String, Map<string, Question[]>>();

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

    getExams(): string[] {
        return this.questionOverview ? this.questionOverview.map(overview => overview.name) : [];
    }

    getQuestionsOfExam(exam: string): Map<string, Question[]> {
        return this.questions.get(exam) || new Map<string, Question[]>();
    }


    async loadQuestionsOfExam(exam: string): Promise<Map<string, Question[]>> {
        console.log('loadQuestionsOfExam');
        let result: Map<string, Question[]> = new Map<string, Question[]>();
        const requests = this.questionOverview.find(overview => overview.name == exam)!.categories.map(category => {
            console.log('loadQuestionsOfExam ' + category.url);
            return this.http.get<Question[]>(category.url).toPromise()
                .then(data => {
                    if (data) {
                        result.set(category.name, data);
                        console.log("Loaded " + data.length + " questions for " + category + " in " + exam);
                    }
                })
                .catch(err => console.log(err));
        });

        await Promise.all(requests);
        console.log('All requests complete');
        return result;
    };
}