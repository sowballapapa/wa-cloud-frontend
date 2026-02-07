import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBase } from './users-base';

describe('UsersBase', () => {
  let component: UsersBase;
  let fixture: ComponentFixture<UsersBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
