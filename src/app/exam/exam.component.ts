import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamStatusComponent } from '../exam-status/exam-status.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  standalone: true,
  imports: [ExamStatusComponent],
  styleUrl: './exam.component.scss'
})
export class ExamComponent {

  constructor(private activatedRoute: ActivatedRoute, private _router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.examName = params['exam'] ;
    });
  }

  public gotoLearning(): void {
    //navigate the browser to /exam/{exam}/learning
    this._router.navigateByUrl('/exam/' + this.examName + '/learning');
  }

  public examName: string | null = null;

}
