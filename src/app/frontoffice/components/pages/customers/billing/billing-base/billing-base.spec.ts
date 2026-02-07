import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingBase } from './billing-base';

describe('BillingBase', () => {
  let component: BillingBase;
  let fixture: ComponentFixture<BillingBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
