import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCrearRevisionComponent } from './modal-crear-revision.component';

describe('ModalCrearRevisionComponent', () => {
  let component: ModalCrearRevisionComponent;
  let fixture: ComponentFixture<ModalCrearRevisionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCrearRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCrearRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
