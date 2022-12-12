import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = '/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  register(registerRequest: User): Observable<any> {
    return this.http.post<User>('/register', registerRequest);
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<string>(`/login?email=${email}&password=${password}`, null);
  }

  logout(): Observable<any> {
    return this.http.get<any>('/logout');
  }

  authenticate(): Observable<any> {
    return this.http.get('/authenticate');
  }
}
