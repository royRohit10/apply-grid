import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})

export class ApiHelperService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllJobs(): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = 'http://localhost:8080/api/seeker/all';
    return this.http.get(baseUrl, { headers });
    // return this.http.get(`${baseUrl}`);
  }

  postJob(payload: any): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = 'http://localhost:8080/jobs/create';
    return this.http.post(baseUrl, payload, { headers });
    // return this.http.get(`${baseUrl}`);
  }

  getMyApplicantions(): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = 'http://localhost:8080/api/seeker/applications';
    return this.http.get(baseUrl, { headers });
    // return this.http.get(`${baseUrl}`);
  }

  ApplyJob(jobID: any): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = `http://localhost:8080/api/seeker/apply/${jobID}`;
    return this.http.post(baseUrl, {}, { headers });
    // return this.http.get(`${baseUrl}`);
  }

  getApplicants(): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = 'http://localhost:8080/api/employer/allApplicants';
    return this.http.get(baseUrl, { headers });
    // return this.http.get(`${baseUrl}`);
  }

  AcceptJob(applicationID: any): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = `http://localhost:8080/api/employer/applications/${applicationID}/accept`;
    return this.http.post(baseUrl, {}, { headers }); 
    // return this.http.get(`${baseUrl}`);
  }

  RejectJob(applicationID: any): Observable<any> {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });

    let baseUrl = `http://localhost:8080/api/employer/applications/${applicationID}/reject`;
    return this.http.post(baseUrl, {}, { headers });
  }
  
}
