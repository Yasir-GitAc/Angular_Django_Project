import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../shared/types/user.model';
import { userFormData } from '../shared/types/user_form_data.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // formData = new FormData();
  user = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) {}

  updateUser(user: User | null): void {
    this.user.next(user);
  }

  // updateToken(token: string): void {
  //   const currentUser = this.user.getValue();
  //   if (currentUser) {
  //     // const email = currentUser.email
  //     const updatedUser = { ...currentUser };
  //     this.updateUser(updatedUser);
  //   }
  // }
  getUser() {
    const url = environment.API_BASE_URL + 'api/user/me/';
    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders().set('Authorization', 'Token ' + token)
      : new HttpHeaders();

    this.http.get<User>(url, { headers }).subscribe({
      next: (response) => {
        this.updateUser(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  signUp(data: FormData) {
    const url = environment.API_BASE_URL + 'api/user/create/';
    return this.http.post(url, data);
  }

  login(email: string, password: string) {
    const url = environment.API_BASE_URL + 'api/user/token/';
    return this.http.post(url, {
      email: email,
      password: password,
    });
  }

  autoLogin() {
    this.getUser();
  }

  logOut() {
    localStorage.removeItem('token');
    // this.router.navigate(['']);
  }
}
