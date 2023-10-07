import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LandingadminaComponent } from './landingadmina.component';

describe('LandingadminaComponent', () => {
  let component: LandingadminaComponent;
  let fixture: ComponentFixture<LandingadminaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingadminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingadminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
