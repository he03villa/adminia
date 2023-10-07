import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CopropiedadesComponent } from './copropiedades.component';

describe('CopropiedadesComponent', () => {
  let component: CopropiedadesComponent;
  let fixture: ComponentFixture<CopropiedadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CopropiedadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopropiedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
