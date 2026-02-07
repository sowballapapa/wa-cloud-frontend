import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsBase } from './domains-base';

describe('DomainsBase', () => {
  let component: DomainsBase;
  let fixture: ComponentFixture<DomainsBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomainsBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainsBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
