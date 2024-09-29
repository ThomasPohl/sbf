import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoComponent} from "../logo/logo.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-splashscreen',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './splashscreen.component.html',
  styleUrl: './splashscreen.component.scss'
})
export class SplashscreenComponent {

  constructor(private _router: Router) {
  }
  gotoOverview() {
    this._router.navigateByUrl('/exam/');

  }
}
