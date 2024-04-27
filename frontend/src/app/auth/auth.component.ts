import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  AbstractControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { matchpassword } from './matchpassword.validator';
import { AuthService } from './auth.service';
import { userFormData } from '../shared/types/user_form_data.interface';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  signUpMode: boolean = true;
  signUpForm: FormGroup;
  // formData: userFormData = {
  //   email: '',
  //   password: '',
  // };
  formData = new FormData();
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(private authService: AuthService, private router: Router) {
    this.signUpForm = new FormGroup(
      {
        Email: new FormControl(null, [Validators.required, Validators.email]),
        Name: new FormControl(null, [Validators.required]),
        Address: new FormControl(null),
        ProfileImage: new FormControl(null),
        Password: new FormControl(null, [Validators.required]),
        ConfirmPassword: new FormControl(null),
      },
      {
        validators: matchpassword,
      }
    );
  }

  switchMode() {
    this.signUpMode = !this.signUpMode;
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('profile_image', file);
    }
  }

  signUpFormSubmit() {
    this.formData.append('email', this.signUpForm.value.Email);
    this.formData.append('name', this.signUpForm.value.Name);
    this.formData.append('address', this.signUpForm.value.Address);
    this.formData.append('password', this.signUpForm.value.Password);

    this.authService.signUp(this.formData).subscribe({
      next: (response) => {
        console.log('from signUpfromSubmit', response);
        this.authService
          .login(this.signUpForm.value.Email, this.signUpForm.value.Password)
          .subscribe({
            next: (response) => {
              if ((response as { token: string }).token) {
                localStorage.setItem(
                  'token',
                  (response as { token: string }).token
                );
              }
              this.authService.getUser();
              this.router.navigate(['']);
            },
            error: (error) => {
              console.log('from signUp-login', error);
            },
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  loginFormSubmit() {
    console.log(this.loginForm);
    console.log(this.loginForm.value);

    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (response) => {
          if ((response as { token: string }).token) {
            localStorage.setItem(
              'token',
              (response as { token: string }).token
            );
          }
          console.log('before', localStorage.getItem('token'));
          this.authService.getUser();
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
