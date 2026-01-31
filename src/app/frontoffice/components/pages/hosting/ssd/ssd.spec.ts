import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ssd } from './ssd';

describe('Ssd', () => {
  let component: Ssd;
  let fixture: ComponentFixture<Ssd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ssd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ssd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
