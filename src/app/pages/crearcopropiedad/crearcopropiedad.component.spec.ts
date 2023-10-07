import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CrearcopropiedadComponent } from './crearcopropiedad.component';

describe('CrearcopropiedadComponent', () => {
  let component: CrearcopropiedadComponent;
  let fixture: ComponentFixture<CrearcopropiedadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcopropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearcopropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
