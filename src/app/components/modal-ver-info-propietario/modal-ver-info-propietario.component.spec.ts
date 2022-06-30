import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerInfoPropietarioComponent } from './modal-ver-info-propietario.component';

describe('ModalVerInfoPropietarioComponent', () => {
  let component: ModalVerInfoPropietarioComponent;
  let fixture: ComponentFixture<ModalVerInfoPropietarioComponent>;

  beforeEach(async(() => {
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
