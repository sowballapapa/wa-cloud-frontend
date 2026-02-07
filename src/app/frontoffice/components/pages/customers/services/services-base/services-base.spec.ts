import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesBase } from './services-base';

describe('ServicesBase', () => {
  let component: ServicesBase;
  let fixture: ComponentFixture<ServicesBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
