import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCambiarPasswordComponent } from './modal-cambiar-password.component';

describe('ModalCambiarPasswordComponent', () => {
  let component: ModalCambiarPasswordComponent;
  let fixture: ComponentFixture<ModalCambiarPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCambiarPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCambiarPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
