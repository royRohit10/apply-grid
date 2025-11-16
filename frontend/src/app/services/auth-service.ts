import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // Removed ApiHelperService injection to avoid circular DI.
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/api';

  login(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/public/login`, payload);
  }

  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/public/register`, payload);
  }

  get role() {
    return localStorage.getItem('role');
  }

  get username() {
    return localStorage.getItem('username');
  }

  get password() {
    return localStorage.getItem('password');
  }
}
