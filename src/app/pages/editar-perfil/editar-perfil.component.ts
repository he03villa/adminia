import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});
  formCojunto: FormGroup = new FormGroup({});
  formPasswors: FormGroup = new FormGroup({});
  validarMensaje = true;
  dataUser:any;

  constructor(
    public services: ServicesService,
    private fb: FormBuilder,
    private User: UserService,
    private Propiedad: PropiedadService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
    if (this.dataUser.conjunto == 0) {
      this.formUser = this.fb.group({
        nombre: [user.nombre, [Validators.required]],
        email: [user.email, [Validators.required]],
        telefono: [user.telefono, [Validators.required]],
      });
    } else if (this.dataUser.conjunto == 1) {
      this.formCojunto = this.fb.group({
        nombre: [user.nombre_propietario, [Validators.required]],
        telefono: [user.telefono, [Validators.required]],
      });
    }
    this.formPasswors = this.fb.group({
      passwors: ['', [Validators.required]],
      new_passwors: ['', [Validators.required]],
      confirmar_passwors: ['', [Validators.required]],
    });
    console.log(this.dataUser);
  }

  abrirModalcontrasena() {
    this.services.showModal('#ModalCambiarcontrasena');
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
  }

  addCuenta() {
    this.dataUser.cuentas_bancarias.push({ nombre: '', cuenta: '' });
  }

  async removeCuenta(indece) {
    if (this.dataUser.cuentas_bancarias[indece].id) {
      const res = await this.Propiedad.deleteCuentas({ id: this.dataUser.cuentas_bancarias[indece].id });
      console.log(res);
    }
    this.dataUser.cuentas_bancarias.splice(indece, 1);
    localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
  }

  async updateUser(event) {
    this.services.addLoading(event.target);
    if (!this.formUser.invalid) {
      const data = {
        nombre: this.formUser.controls.nombre.value,
        telefono: this.formUser.controls.telefono.value,
        id: this.dataUser.id
      };
      console.log(data);
      const res:any = await this.User.updateUser(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.dataUser.nombre = data.nombre;
        this.dataUser.telefono = data.telefono;
        localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  async updateConjunto(event) {
    this.services.addLoading(event.target);
    if (!this.formCojunto.invalid) {
      const data = {
        nombre: this.formCojunto.controls.nombre.value,
        telefono: this.formCojunto.controls.telefono.value,
        id: this.dataUser.id
      };
      console.log(data);
      const res:any = await this.Propiedad.updatePropietario(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.dataUser.nombre_propietario = data.nombre;
        this.dataUser.telefono = data.telefono;
        localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  async saveCuenta(event) {
    this.services.addLoading(event.target);
    const cantidad = this.dataUser.cuentas_bancarias.filter(f => !this.services.validarText(f.nombre) && !this.services.validarText(f.cuenta)).length;
    console.log(cantidad);
    if (cantidad == 0) {
      const data = { cuentas_bancarias: this.dataUser.cuentas_bancarias, cojunto: this.dataUser.id };
      console.log(data);
      const res:any = await this.Propiedad.saveCuentas(data);
      console.log(res);
      this.dataUser.cuentas_bancarias = res.data;
      localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
      if (res.error.length > 0) {
        this.services.Alert('error', '', `La cuentas ${ res.error.toString() } ya existen`, 'aceptar', '');
      } else if (res.status == 'success') {
        this.services.Alert('success', '', res.mensaje, 'aceptar', '');
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.Alert('warning', '', 'Hay cuneta que estan en vacío', 'aceptar', '');
      this.services.removeLoading(event.target);
    }
  }

  limpiar() {
    this.formPasswors.controls.passwors.setValue('');
    this.formPasswors.controls.new_passwors.setValue('');
    this.formPasswors.controls.confirmar_passwors.setValue('');
  }

  async updatePassword(event) {
    this.services.addLoading(event.submitter);
    if (!this.formPasswors.invalid) {
      if (this.formPasswors.controls.passwors.value == this.formPasswors.controls.confirmar_passwors.value) {
        this.services.Alert('error', '', 'Las contraseñas anterior y confirmar contraseña son iguales', 'Aceptar', '');
        this.services.removeLoading(event.submitter);
        return false;
      } else if (this.formPasswors.controls.new_passwors.value != this.formPasswors.controls.confirmar_passwors.value) {
        this.services.Alert('error', '', 'Las nueva contraseñas y confirmar contraseña no coinciden', 'Aceptar', '');
        this.services.removeLoading(event.submitter);
        return false;
      } else if (this.formPasswors.controls.passwors.value == this.formPasswors.controls.new_passwors.value) {
        this.services.Alert('error', '', 'Las contraseñas anterior y la nueva contraseñas son iguales', 'Aceptar', '');
        this.services.removeLoading(event.submitter);
        return false;
      }
      const data = {
        id: this.dataUser.id,
        password: this.formPasswors.controls.passwors.value,
        newPassword: this.formPasswors.controls.new_passwors.value
      }
      console.log(data);
      const res:any = this.dataUser.conjunto == 0 ? await this.User.updatePassword(data) : await this.Propiedad.updatePassword(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.limpiar();
        /* this.services.hideModal('#ModalCambiarcontrasena'); */
      }
      this.services.removeLoading(event.submitter);
    } else {
      this.services.removeLoading(event.submitter);
    }
  }

}
