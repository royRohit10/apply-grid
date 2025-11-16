import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {

  role: string | null = null;
  username: string | null = null;

  constructor(private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getRole();
    this.getUsername();
  }

  getRole() {
    this.role = localStorage.getItem('role');
    console.log(this.role, 'role')
    this.selectDashboardBasedOnRole();
  }

  getUsername() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    this.toastr.success('Logged out successfully!');
    this.router.navigate(['/']); 
  }

  selectDashboardBasedOnRole = () => {
    if (this.role === 'EMPLOYER') {
      this.router.navigate(['/home/applicants']);
    } 
    else if (this.role === 'JOB_SEEKER') {
      this.router.navigate(['/home/jobs']);
    }
  }

}
