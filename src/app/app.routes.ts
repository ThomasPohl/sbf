import { Routes } from '@angular/router';
import { ExamOverviewComponent } from './exam-overview/exam-overview.component';
import { ExamComponent } from './exam/exam.component';
import { ExamLearningComponent } from './exam-learning/exam-learning.component';
export const routes: Routes = [
    { path: '', redirectTo: 'exam', pathMatch: 'full' },
    { path: 'exam', component: ExamOverviewComponent },
    { path: 'exam/:exam', component: ExamComponent },
    { path: 'exam/:exam/learning', component: ExamLearningComponent }
];
