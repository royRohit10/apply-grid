import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.html',
  styleUrl: './jobs.scss',
})
export class Jobs {

  public jobList : any = [];
  loadingJobId: string | null = null;

  constructor(private apiService: ApiHelperService, 
    private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.getAllJobs();
  }

  getAllJobs() {
    this.apiService.getAllJobs().subscribe({
      next : (data: any) => {
      // this.jobs = data;
      this.jobList = data;
      console.log(this.jobList, "jobList")
      },
      error : (err) => {
        console.error("Error", err)
      }
    });
  }

  apply = (id: any) => {
    this.loadingJobId = id;
    this.apiService.ApplyJob(id).subscribe({
      next: () => {
        this.toastr.success('Job applied successfully!');
        this.loadingJobId = null;

        this.getAllJobs();
      },
      error: (err) => {
        this.toastr.error('Job application failed!');
        console.error("Error", err);
        this.loadingJobId = null;
      }
    });
  }
  

}
