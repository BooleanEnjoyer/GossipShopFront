import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageOverviewComponent } from './product-image-overview.component';

describe('ProductImageOverviewComponent', () => {
  let component: ProductImageOverviewComponent;
  let fixture: ComponentFixture<ProductImageOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImageOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
