import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper-service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})

export class Dashboard {

  constructor(private apiService: ApiHelperService) {}
  public applications: any = [];

  ngOnInit() {
    this.apiService.getMyApplicantions().subscribe({
      next : (data: any) => {
      // this.jobs = data;
      this.applications = data;
      console.log(this.applications, "jobList")
      },
      error : (err) => {
        console.error("Error", err)
      }
    });
  }

}
