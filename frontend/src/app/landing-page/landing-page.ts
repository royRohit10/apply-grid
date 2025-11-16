import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {

  constructor(private router: Router) {}

  goToLogin = () => {
    this.router.navigate(['/login']);
  }

  goToRegister = () => {
    this.router.navigate(['/register']);
  }

}
