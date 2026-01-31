import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCarousel } from './auth-carousel';

describe('AuthCarousel', () => {
  let component: AuthCarousel;
  let fixture: ComponentFixture<AuthCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
