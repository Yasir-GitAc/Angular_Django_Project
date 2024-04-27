import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { TestFormComponent } from './forms/test-form/test-form.component';
import { ProductFormTestComponent } from './forms/product-form-test/product-form-test.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'authentication', component: AuthComponent },
  { path: 'form', component: TestFormComponent },
  { path: 'product_test_form', component: ProductFormTestComponent },
];
