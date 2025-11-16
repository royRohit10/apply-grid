import { Component } from '@angular/core';
import { ApiHelperService } from '../services/api-helper-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-job',
  imports: [FormsModule],
  templateUrl: './post-job.html',
  styleUrl: './post-job.scss',
})
export class PostJob {
  public title=''; 
  public company=''; 
  public location=''; 
  public salary=0; 
  public description='';

  constructor(private apiService: ApiHelperService) {
  }

  submit(){ 
    const payload = 
    { 
      title:this.title, 
      company:this.company, 
      location:this.location, 
      salary: this.salary, 
      description: this.description 
    }; 

    this.apiService.postJob(payload).subscribe({
      next : (data: any) => {
      console.log(data, "jobPosted")
      },
      error : (err) => {
        console.error("Error", err)
      }
    });
  }
}
