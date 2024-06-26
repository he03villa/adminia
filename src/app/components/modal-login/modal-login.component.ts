import { Component, inject, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LanzamientoService } from 'src/app/services/lanzamiento.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalLoginComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  formRegistro: FormGroup = new FormGroup({});
  formRegistroLanzamiento: FormGroup = new FormGroup({});
  validarMensaje = true;
  validarMensajeRegistro = true;
  ojo = false;
  offcanvasService = inject(NgbOffcanvas);

  constructor(
    public services: ServicesService,
    private fb: FormBuilder,
    private User: UserService,
    private _lanzamiento: LanzamientoService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.formRegistro = this.fb.group({
      nombre: ['', [Validators.required]],
      /* fecha: ['', [Validators.required, this.services.validar18yead()]], */
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmar_password: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
    this.formRegistroLanzamiento = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailConfirmar: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]]
    });
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
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
        this.services.hideModal('#modalLogin');
        localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard/copropiedades');
      } else {
        this.services.Alert('error', '', res['message'], 'Aceptar', '', false);
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
        this.services.hideModal('#modalLogin');
        localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard');
      } else {
        this.services.Alert('error', '', res['message'], 'Aceptar', '', false);
      }
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.target);
    }
  }

  abrirModal() {
    this.formRegistro.controls.nombre.setValue('');
    this.formRegistro.controls.email.setValue('');
    /* this.formRegistro.controls.fecha.setValue(''); */
    this.formRegistro.controls.password.setValue('');
    this.services.showModal('#ModalRegistro');
  }

  async registrar(event) {
    this.services.addLoading(event.submitter);
    if (!this.formRegistro.invalid) {
      if (this.formRegistro.controls.password.value != this.formRegistro.controls.confirmar_password.value) {
        this.services.Alert('error', '', 'Las contraseñas no coinciden', 'Aceptar', '');
        this.services.removeLoading(event.submitter);
        return false;
      }
      const data = {
        nombre: this.formRegistro.controls.nombre.value,
        email: this.formRegistro.controls.email.value,
        fecha: '2022-07-12',
        password: this.formRegistro.controls.password.value,
        rol: 1,
        telefono: this.formRegistro.controls.telefono.value
      };
      const res = await this.User.saveUser(data);
      this.services.removeLoading(event.submitter);
      if (res['status'] == 'success') {
        const re = await this.services.Alert('success', '', 'EL usuario se creo correctamente', 'Aceptar', '', false);
        this.services.hideModal('#ModalRegistro');
        /* localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard'); */
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

  limpiarLanzamiento() {
    this.formRegistroLanzamiento.reset();
  }

  async saveLanzamiento(event) {
    this.services.addLoading(event.target);
    if (!this.formRegistroLanzamiento.invalid) {
      const data = this.formRegistroLanzamiento.getRawValue();
      console.log(data);
      const res = await this._lanzamiento.saveLanzamiento(data);
      this.services.removeLoading(event.target);
      if (res['status'] == 'success') {
        const re = await this.services.Alert('success', '', 'La solicitud se envió', 'Aceptar', '', false);
        this.services.hideModal('#ModalRegistroEspera');
        this.limpiarLanzamiento();
        /* localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard'); */
      } else {
        this.services.Alert('error', '', 'No se pudo enviar la solicitud', 'Aceptar', '', false);
      }
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.target);
    }
  }

}
