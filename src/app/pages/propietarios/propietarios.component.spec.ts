import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PropietariosComponent } from './propietarios.component';

describe('PropietariosComponent', () => {
  let component: PropietariosComponent;
  let fixture: ComponentFixture<PropietariosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PropietariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
