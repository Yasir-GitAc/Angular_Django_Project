import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-product-form-test',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-form-test.component.html',
  styleUrl: './product-form-test.component.css',
})
export class ProductFormTestComponent implements OnInit {
  productForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  formData = new FormData();

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

  // // size: ['', Validators.required],
  // variant: this.formBuilder.array([]),

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.log('form ', this.productForm);
    console.log('form_value', this.productForm.value);
  }

  getVariantControls() {
    return (<FormArray>this.productForm.get('variant')).controls;
  }

  addVariant() {
    const control = new FormControl(null);
    (<FormArray>this.productForm.get('variant')).push(control); // explicitly cast
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.formData.append('upload_images', files[i]);
      }
    }
  }

  private initForm() {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      detail: new FormControl(null, [Validators.required]),
      upload_images: new FormControl(null, [Validators.required]),
      category: new FormControl(null),
      // size: new FormControl(null),
      price: new FormControl(null, [Validators.required]),
      discount: new FormControl(null),
      // sizes: new FormArray<any>([new FormControl(null)]),
      variant: new FormArray([]),
    });
  }
}
