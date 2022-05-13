import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const email = app.form.controls['email'];
    email.setValue('he03villa@gmail.com');
    expect(app.form.invalid).toBeTruthy();
  });

  it('Retornar formulario valido', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const email = app.form.controls['email'];
    const password = app.form.controls['password'];

    email.setValue('he03villa@gmail.com');
    password.setValue('123456');

    expect(app.form.invalid).toBeFalsy();
  });

  it('Debe de ir a otra url', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const email = app.form.controls['email'];
    const password = app.form.controls['password'];

    email.setValue('he03villa@gmail.com');
    password.setValue('123456');

    const btn = fixture.debugElement.query(By.css('button.btn'));
    btn.nativeElement.click();
  });

  it('valiadar mostrar mensaje', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    const email = app.form.controls['email'];
    const password = app.form.controls['password'];

    email.setValue('');
    password.setValue('');

    const btn = fixture.debugElement.query(By.css('button.btn'));
    btn.nativeElement.click();

    expect(app.validarMensaje).toBeFalsy();
  });


  it('validar quitar mensaje', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.cambiarValidarMensaje();

    expect(app.validarMensaje).toBeTruthy();
  });
});
