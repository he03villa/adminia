import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formRegistro: FormGroup = new FormGroup({});
  validarMensaje = true;
  validarMensajeRegistro = true;

  constructor(
    public services: ServicesService,
    private fb: FormBuilder,
    private User: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['prueba1@prueba.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]]
    });
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      fecha: ['', [Validators.required, this.services.validar18yead()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
  }

  cambiarValidarMensajeRegistro() {
    this.validarMensajeRegistro = true;
  }

  async login(event) {
    /* this.validarMensaje = this.form.invalid; */
    this.services.addLoading(event.target);
    if (!this.form.invalid) {
      const data = { email: this.form.controls.email.value, password: this.form.controls.password.value, rol: 1 };
      console.log(data);
      const res = await this.User.Login(data);
      this.services.removeLoading(event.target);
      if (res['status'] == 'success') {
        localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard');
      } else {
        this.services.Alert('error', '', 'EL usuario no existe', 'Aceptar', '', false);
      }
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.target);
    }
  }

  async loginPropiedad(event) {
    /* this.validarMensaje = this.form.invalid; */
    this.services.addLoading(event.target);
    if (!this.form.invalid) {
      const data = { email: this.form.controls.email.value, password: this.form.controls.password.value, rol: 1 };
      console.log(data);
      const res = await this.User.LoginPropiedad(data);
      this.services.removeLoading(event.target);
      if (res['status'] == 'success') {
        localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard');
      } else {
        this.services.Alert('error', '', 'EL usuario no existe', 'Aceptar', '', false);
      }
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.target);
    }
  }

  abrirModal() {
    this.formRegistro.controls.nombre.setValue('');
    this.formRegistro.controls.email.setValue('');
    this.formRegistro.controls.fecha.setValue('');
    this.formRegistro.controls.password.setValue('');
    this.services.showModal('#ModalRegistro');
  }

  async registrar(event) {
    this.services.addLoading(event.submitter);
    if (!this.formRegistro.invalid) {
      const data = {
        nombre: this.formRegistro.controls.nombre.value,
        email: this.formRegistro.controls.email.value,
        fecha: this.formRegistro.controls.fecha.value,
        password: this.formRegistro.controls.password.value,
        rol: 1
      };
      const res = await this.User.saveUser(data);
      this.services.removeLoading(event.submitter);
      if (res['status'] == 'success') {
        const re = await this.services.Alert('success', '', 'EL usuario se creo correctamente', 'Aceptar', '', false);
        this.services.hideModal('#ModalRegistro');
        localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard');
      } else if (res['status'] == 'errorUser') {
        this.services.Alert('error', '', 'EL usuario ya existe', 'Aceptar', '', false);
      } else {
        this.services.Alert('error', '', res['message'], 'Aceptar', '', false);
      }
    } else {
      this.validarMensajeRegistro = false;
      this.services.removeLoading(event.submitter);
    }
  }

}
