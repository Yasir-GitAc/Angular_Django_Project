import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormTestComponent } from './product-form-test.component';

describe('ProductFormTestComponent', () => {
  let component: ProductFormTestComponent;
  let fixture: ComponentFixture<ProductFormTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFormTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
