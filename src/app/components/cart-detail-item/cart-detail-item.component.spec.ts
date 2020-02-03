import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailItemComponent } from './cart-detail-item.component';

describe('CartDetailItemComponent', () => {
  let component: CartDetailItemComponent;
  let fixture: ComponentFixture<CartDetailItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartDetailItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
