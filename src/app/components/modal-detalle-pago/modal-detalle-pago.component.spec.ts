import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallePagoComponent } from './modal-detalle-pago.component';

describe('ModalDetallePagoComponent', () => {
  let component: ModalDetallePagoComponent;
  let fixture: ComponentFixture<ModalDetallePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDetallePagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetallePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
