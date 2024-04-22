import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBlackboxOpenComponent } from './order-blackbox-open.component';

describe('OrderBlackboxOpenComponent', () => {
  let component: OrderBlackboxOpenComponent;
  let fixture: ComponentFixture<OrderBlackboxOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBlackboxOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderBlackboxOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
