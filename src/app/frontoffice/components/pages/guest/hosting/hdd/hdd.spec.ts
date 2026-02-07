import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hdd } from './hdd';

describe('Hdd', () => {
  let component: Hdd;
  let fixture: ComponentFixture<Hdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
