import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HistorialRevisionesComponent } from './historial-revisiones.component';

describe('HistorialRevisionesComponent', () => {
  let component: HistorialRevisionesComponent;
  let fixture: ComponentFixture<HistorialRevisionesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialRevisionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialRevisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
