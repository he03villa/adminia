import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaListaPropiedadComponent } from './moda-lista-propiedad.component';

describe('ModaListaPropiedadComponent', () => {
  let component: ModaListaPropiedadComponent;
  let fixture: ComponentFixture<ModaListaPropiedadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaListaPropiedadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaListaPropiedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
