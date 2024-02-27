import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, HttpClientModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'frontend - Angular';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    console.log('comprunning')
  }

  onSubmit(form: NgForm){
    console.log('from onsubmit')
    console.log(form)
    console.log(form.value)

    const name = form.value.name
    console.log('name', name)

    // this.http.post('http://127.0.0.1:8000/api/user/create/',
    this.http.post('http://127.0.0.1:8000/api/user/token/',
    { email: form.value.email,
      password: form.value.password
    }).subscribe(res => console.log(res))

    // form.reset()
  }
}
