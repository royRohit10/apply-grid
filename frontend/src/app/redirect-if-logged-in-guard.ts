import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class RedirectIfLoggedInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    if (username || role) {
      this.router.navigate(['/home'], { replaceUrl: true });
      return false;
    }

    return true;
  }
}
