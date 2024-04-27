import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css',
})
export class TestFormComponent {
  Form!: FormGroup;
  formData = new FormData();
  //TODO: fetch all categories from backend and then populate the select field.
  categories = [
    {
      id: 4,
      name: 'Shoe',
    },
    {
      id: 5,
      name: 'Shirt',
    },
    {
      id: 6,
      name: 'Sneakers',
    },
  ];
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit() {
    const category = {
      id: 1,
      name: 'United States',
    };
    //TODO: add dynamic size adding functionality
    //FIXME: multiple category upload throwing errors
    this.Form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      detail: new FormControl(null, [Validators.required]),
      upload_images: new FormControl(null, [Validators.required]),
      category: new FormControl(null),
      // size: new FormControl(null),
      price: new FormControl(null, [Validators.required]),
      discount: new FormControl(null),
      sizes: new FormArray<any>([]),
    });
  }

  getSizeControls() {
    return (<FormArray>this.Form.get('sizes')).controls;
  }

  onAddSize() {
    const size_control = new FormControl(null, Validators.required);
    (<FormArray>this.Form.get('sizes')).push(size_control);
  }

  onDeleteSize(index: number) {
    (<FormArray>this.Form.get('sizes')).removeAt(index);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.formData.append('upload_images', files[i]);
      }
    }
  }

  submit() {
    console.log('form before formdata append', this.Form.value);
    console.log('category_value', this.Form.value.category);
    console.log('size', this.Form.value.sizes);
    // console.log('productform', this.productForm.value);

    this.formData.append('name', this.Form.value.name);
    this.formData.append('detail', this.Form.value.detail);
    this.formData.append('price', this.Form.value.price);
    this.formData.append('discount', this.Form.value.discount);
    this.formData.append('category_inputs', this.Form.value.category);
    this.formData.append('size_inputs', this.Form.value.sizes);

    const url = environment.API_BASE_URL + 'api/product/create_product/';
    // const url = 'nothing';
    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders().set('Authorization', 'Token ' + token)
      : new HttpHeaders();

    const formData = this.formData;
    console.log('after appending to formdata', formData);
    this.http.post(url, formData, { headers }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });

    // this.Form.reset();
  }
}
