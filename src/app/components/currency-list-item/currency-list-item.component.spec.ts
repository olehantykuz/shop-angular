import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyListItemComponent } from './currency-list-item.component';

describe('CurrencyListItemComponent', () => {
  let component: CurrencyListItemComponent;
  let fixture: ComponentFixture<CurrencyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencyListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
