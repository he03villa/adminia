import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CopropiedadesComponent } from './copropiedades.component';

describe('CopropiedadesComponent', () => {
  let component: CopropiedadesComponent;
  let fixture: ComponentFixture<CopropiedadesComponent>;

  beforeEach(async(() => {
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
