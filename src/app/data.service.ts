import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'backend/src/models/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  updateUser(userId: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
}
