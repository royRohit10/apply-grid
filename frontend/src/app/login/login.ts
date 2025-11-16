import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})

export class Login {
  user = { username: '', password: '' };
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    if (localStorage.getItem('role')) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  login(form: NgForm) {
    if (!form.valid) return;

    this.isSubmitting = true;

    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('username', this.user.username);
        localStorage.setItem('password', this.user.password);
        localStorage.setItem('role',res.role)
        this.toastr.success(`Welcome back, ${res.name}!`);
        this.isSubmitting = false;
        form.resetForm();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error('Invalid email or password!');
        this.isSubmitting = false;
      },
    });
  }
}
