import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { HttpClientHelper } from '../base-url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = `${HttpClientHelper.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`);
  }

  register(registerRequest: User): Observable<any> {
    return this.http.post<User>(`${HttpClientHelper.baseUrl}/register`, registerRequest);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${HttpClientHelper.baseUrl}/login?email=${email}&password=${password}`, null);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${HttpClientHelper.baseUrl}/logout`, null);
  }
}
