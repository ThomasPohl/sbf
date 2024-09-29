import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogoComponent} from "../logo/logo.component";

@Component({
  selector: 'app-exam-status',
  standalone: true,
    imports: [CommonModule, LogoComponent],
  templateUrl: './exam-status.component.html',
  styleUrl: './exam-status.component.scss'
})
export class ExamStatusComponent {

}
