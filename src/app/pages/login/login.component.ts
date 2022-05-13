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
  validarMensaje = true;

  constructor(
    private services: ServicesService,
    private fb: FormBuilder,
    private User: UserService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
  }

  async login(event) {
    /* this.validarMensaje = this.form.invalid; */
    this.services.addLoading(event.submitter);
    if (!this.form.invalid) {
      const data = { email: this.form.controls.email.value, password: this.form.controls.password.value };
      console.log(data);
      const res = await this.User.Login(data);
      this.services.removeLoading(event.submitter);
      if (res['status'] == 'success') {
        localStorage.setItem('dataUser', JSON.stringify(res['data']));
        this.services.url('dashboard');
      } else {
        this.services.Alert('error', '', 'EL usuario no existe', 'Aceptar', '', false);
      }
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.submitter);
    }
  }

}
