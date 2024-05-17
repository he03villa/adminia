import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { PropiedadService } from '../../services/propiedad.service';
import { PagosService } from '../../services/pagos.service';
import { TipoDocumentoService } from '../../services/tipo-documento.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  formUser: UntypedFormGroup = new UntypedFormGroup({});
  formCojunto: UntypedFormGroup = new UntypedFormGroup({});
  formPasswors: UntypedFormGroup = new UntypedFormGroup({});
  formBanks: UntypedFormGroup = new UntypedFormGroup({});
  validarMensaje = true;
  dataUser:any;
  arrayBanks = [];
  arrayTipoDocumento = [];
  arrayTipoBanco = [];

  constructor(
    public services: ServicesService,
    private fb: UntypedFormBuilder,
    private User: UserService,
    private Propiedad: PropiedadService,
    private pago: PagosService,
    private _tipoDocumento: TipoDocumentoService
  ) { }

  ngOnInit() {
    this.cagraBanco();
    this.cargarTipoDocumentos();
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
    if (this.dataUser.conjunto == 0) {
      this.formUser = this.fb.group({
        nombre: [user.nombre, [Validators.required]],
        email: [user.email, [Validators.required]],
        telefono: [user.telefono, [Validators.required]],
        tipo_documentacion_id: [user.tipo_documentacion_id, [Validators.required]],
        numero_documento: [user.numero_documento, [Validators.required]],
      });
    } else if (this.dataUser.conjunto == 1) {
      this.formCojunto = this.fb.group({
        nombre: [user.nombre_propietario, [Validators.required]],
        telefono: [user.telefono, [Validators.required]],
        tipo_documentacion_id: [user.tipo_documentacion_id, [Validators.required]],
        numero_documento: [user.numero_documento, [Validators.required]],
      });
    }
    this.formPasswors = this.fb.group({
      passwors: ['', [Validators.required]],
      new_passwors: ['', [Validators.required]],
      confirmar_passwors: ['', [Validators.required]],
    });
    this.formBanks = this.fb.group({
      arrayBanks: this.fb.array([])
    });
    this.cargarCuentas();
    this.cargaTipoBanco();
    console.log(this.dataUser);
  }

  cargarCuentas() {
    if (this.dataUser.cuentas_bancarias.length > 0) {
      this.dataUser.cuentas_bancarias.filter(f => {
        this.getFormItem().push(this.itemBank(f));
      });
    } else {
      this.addCuenta();
    }
  }

  async cagraBanco() {
    const res:any = await this.pago.listbank();
    console.log(res);
    this.arrayBanks = res.body;
  }

  async cargaTipoBanco() {
    const res:any = await this.pago.listaTipoBanco();
    console.log(res);
    this.arrayTipoBanco = res.data;
  }

  async cargarTipoDocumentos() {
    const res:any = await this._tipoDocumento.listTipoDocumento();
    console.log(res);
    this.arrayTipoDocumento = res.data;
  }

  abrirModalcontrasena() {
    this.services.showModal('#ModalCambiarcontrasena');
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
  }

  addCuenta() {
    const data = { nombre: '', cuenta: '', code: '', tipo: '', id: 0, tipo_documentacion_id: '', numero_documento: '', documento: '' };
    this.dataUser.cuentas_bancarias.push(data);
    this.getFormItem().push(this.itemBank(data));
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
        id: this.dataUser.id,
        numero_documento: this.formUser.controls.numero_documento.value,
        tipo_documento: this.formUser.controls.tipo_documentacion_id.value
      };
      console.log(data);
      const res:any = await this.User.updateUser(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.dataUser.nombre = data.nombre;
        this.dataUser.telefono = data.telefono;
        this.dataUser.numero_documento = data.numero_documento;
        this.dataUser.tipo_documentacion_id = data.tipo_documento;
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
        id: this.dataUser.id,
        numero_documento: this.formCojunto.controls.numero_documento.value,
        tipo_documento: this.formCojunto.controls.tipo_documentacion_id.value
      };
      console.log(data);
      const res:any = await this.Propiedad.updatePropietario(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.dataUser.nombre_propietario = data.nombre;
        this.dataUser.telefono = data.telefono;
        this.dataUser.numero_documento = data.numero_documento;
        this.dataUser.tipo_documentacion_id = data.tipo_documento;
        localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  async saveCuenta(event) {
    this.services.addLoading(event.target);
    const dataArrayBanks = this.formBanks.getRawValue().arrayBanks;
    const cantidad = dataArrayBanks.filter(f => !this.services.validarText(f.nombre) && !this.services.validarText(f.cuenta) && !this.services.validarText(f.code) && !this.services.validarText(f.tipo) && !this.services.validarText(f.tipo_documentacion_id) && !this.services.validarText(f.numero_documento) && !this.services.validarText(f.documento)).length;
    console.log(cantidad);
    if (cantidad == 0) {
      const data = { cuentas_bancarias: dataArrayBanks, id: this.dataUser.id, cojunto: this.dataUser.conjunto };
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

  getFormItem(): UntypedFormArray {
    return this.formBanks.get('arrayBanks') as UntypedFormArray;
  }

  itemBank(item): UntypedFormGroup {
    return this.fb.group({
      nombre: [item.nombre],
      cuenta: [item.cuenta],
      code: [item.code],
      tipo: [item.tipo],
      id: [item.id],
      tipo_documentacion_id: [item.tipo_documentacion_id],
      numero_documento: [item.numero_documento],
      documento: [item.documento]
    });
  }

  optionNameBank(event, indiceBank) {
    const tipo = this.arrayBanks.find(f => f.code == event.target.value);
    const cuenta:any = this.getFormItem().controls[indiceBank];
    cuenta.controls.nombre.setValue(tipo.name);
  }

  async cambiarFoto(event, indice1) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size >= 5000000) {
        this.services.Alert('warning', '', 'El tamaño de la imagen debe de ser menor a 5 M.B.', 'Aceptar', false);
        return;
      }/*  else if (file.type != 'image/jpeg' && file.type != 'image/png') {
        this.services.Alert('warning', '', 'Solo se permite imagen con el formato png y jpg', 'Aceptar', false);
        return;
      } */
      const res:any = await this.services.cargar_img(file);
      this.getFormItem().controls[indice1]['controls']['documento'].setValue(res);
    }
  }

}
