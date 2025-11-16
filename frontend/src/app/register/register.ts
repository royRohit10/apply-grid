import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
  standalone: true
})
export class Register {
  isSubmitting = false;

  user = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    if (localStorage.getItem('role')) {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  register(form: NgForm) {
    if (!form.valid) {
      this.toastr.warning('Please fill all mandatory fields!');
      return;
    }

    this.isSubmitting = true;

    this.authService.register(this.user).subscribe({
      next: (data: any) => {
        this.toastr.success('Registered successfully!');
        this.isSubmitting = false;
        form.resetForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Registration failed!');
        this.isSubmitting = false;
      }
    });
  }
}
