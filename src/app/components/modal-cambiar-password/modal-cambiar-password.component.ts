import { Component, OnInit, Directive as  } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { UserService } from '../../services/user.service';
import { PropiedadService } from '../../services/propiedad.service';

@()
@Directive()
@Component({
  selector: 'app-modal-cambiar-password',
  templateUrl: './modal-cambiar-password.component.html',
  styleUrls: ['./modal-cambiar-password.component.scss']
})
export class ModalCambiarPasswordComponent implements OnInit {

  formPasswors: UntypedFormGroup = new UntypedFormGroup({});
  validarMensaje = true;
  dataUser;

  constructor(
    public services: ServicesService,
    private fb: UntypedFormBuilder,
    private User: UserService,
    private Propiedad: PropiedadService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
    this.formPasswors = this.fb.group({
      passwors: ['', [Validators.required]],
      new_passwors: ['', [Validators.required]],
      confirmar_passwors: ['', [Validators.required]],
    });
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
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
        this.services.hideModal('#ModalCambiarcontrasena');
      }
      this.services.removeLoading(event.submitter);
    } else {
      this.services.removeLoading(event.submitter);
    }
  }

}
