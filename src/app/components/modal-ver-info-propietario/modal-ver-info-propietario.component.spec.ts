import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalVerInfoPropietarioComponent } from './modal-ver-info-propietario.component';

describe('ModalVerInfoPropietarioComponent', () => {
  let component: ModalVerInfoPropietarioComponent;
  let fixture: ComponentFixture<ModalVerInfoPropietarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVerInfoPropietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerInfoPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
