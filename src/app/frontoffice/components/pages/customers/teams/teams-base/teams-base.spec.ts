import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsBase } from './teams-base';

describe('TeamsBase', () => {
  let component: TeamsBase;
  let fixture: ComponentFixture<TeamsBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
