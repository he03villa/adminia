import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuzonComponent } from './buzon.component';

describe('BuzonComponent', () => {
  let component: BuzonComponent;
  let fixture: ComponentFixture<BuzonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuzonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuzonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
