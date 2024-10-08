import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ExamOverviewComponent } from './exam-overview/exam-overview.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LogoComponent} from "./logo/logo.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, ExamOverviewComponent, NgbModule, LogoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {
  }



}
