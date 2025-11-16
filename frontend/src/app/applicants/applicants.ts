import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applicants',
  imports: [CommonModule],
  templateUrl: './applicants.html',
  styleUrl: './applicants.scss',
})

export class Applicants implements OnInit {

  public applicants: any = [];
  loadingAcceptId: string | null = null;
  loadingRejectId: string | null = null;

  constructor(
    private apiService: ApiHelperService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApplicants();
  }

  loadApplicants() {
    this.apiService.getApplicants().subscribe({
      next: (data: any) => {
        this.applicants = data;
        console.log(this.applicants, "ApplicantList");
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
  }

  accept(id: any) {
    this.loadingAcceptId = id;
  
    this.apiService.AcceptJob(id).subscribe({
      next: () => {
        this.toastr.success('Job accepted successfully!');
        this.loadingAcceptId = null;
        this.loadApplicants();
      },
      error: (err) => {
        this.toastr.error('Job acceptance failed!');
        console.error(err);
        this.loadingAcceptId = null;
      }
    });
  }

  reject(id: any) {
    this.loadingRejectId = id;
  
    this.apiService.RejectJob(id).subscribe({
      next: () => {
        this.toastr.success('Job rejected successfully!');
        this.loadingRejectId = null;
        this.loadApplicants();
      },
      error: (err) => {
        this.toastr.error('Job rejection failed!');
        console.error(err);
        this.loadingRejectId = null;
      }
    });
  }
  
}
