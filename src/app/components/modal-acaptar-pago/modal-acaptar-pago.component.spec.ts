import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAcaptarPagoComponent } from './modal-acaptar-pago.component';

describe('ModalAcaptarPagoComponent', () => {
  let component: ModalAcaptarPagoComponent;
  let fixture: ComponentFixture<ModalAcaptarPagoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAcaptarPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAcaptarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
