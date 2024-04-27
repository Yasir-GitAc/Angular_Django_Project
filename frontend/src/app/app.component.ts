import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend - Angular';
  userData = {
    email: '',
    name: '',
    profilePicture: null,
    address: '',
    password: '',
  };
  formData = new FormData();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('from root app component_running');
    if (localStorage.getItem('token')) {
      this.authService.autoLogin();
    }
  }

  // onSubmit(form: NgForm) {
  //   const name = form.value.name;
  //   this.formData.append('email', form.value.email);
  //   this.formData.append('name', form.value.name);
  //   this.formData.append('address', form.value.address);
  //   this.formData.append('password', form.value.password);

  //   // this.http.post('http://127.0.0.1:8000/api/user/token/',
  //   this.http
  //     .post('http://127.0.0.1:8000/api/user/create/', this.formData)
  //     .subscribe((res) => console.log(res));

  //   // form.reset()
  // }

  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.formData.append('profile_image', file);
  //   }
  // }
}
