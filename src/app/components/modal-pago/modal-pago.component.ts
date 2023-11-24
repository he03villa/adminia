import { Component, Inject, Input, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';
import { ServicesService } from 'src/app/services/services.service';
import { TipoDocumentoService } from 'src/app/services/tipo-documento.service';

@Component({
  selector: 'app-modal-pago',
  templateUrl: './modal-pago.component.html',
  styleUrls: ['./modal-pago.component.scss']
})
export class ModalPagoComponent {
  @Input() dataPago;
  private fb: FormBuilder = new FormBuilder();
  arrayBanks = [];
  arrayTipoDocumento = [];
  dataUser;
  form: FormGroup = this.fb.group({
    optionDatos: [true],
    nombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    numero_identidad: ['', [Validators.required]],
    tipo_identidad: ['', [Validators.required]],
    banco: ['', [Validators.required]],
  });

  constructor(
    private _pagos: PagosService,
    private _tipoDocumento: TipoDocumentoService,
    private services: ServicesService
  ) {
    
  }

  ngOnInit() {
    this.cagraBanco();
    this.cargarTipoDocumentos();
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
    this.form.controls["nombre"].setValue(this.dataUser?.nombre);
    this.form.controls["telefono"].setValue(this.dataUser?.telefono);
    this.form.controls["email"].setValue(this.dataUser?.email);
    this.form.controls["numero_identidad"].setValue(this.dataUser?.numero_documento);
    this.form.controls["tipo_identidad"].setValue(this.dataUser?.tipo_documentacion_id);
  }

  ngOnChanges(change: SimpleChange) {
    /* console.log(change);
    console.log(this.dataPago); */
  }

  async cagraBanco() {
    const res:any = await this._pagos.listbank();
    this.arrayBanks = res.body;
  }

  async cargarTipoDocumentos() {
    const res:any = await this._tipoDocumento.listTipoDocumento();
    console.log(res);
    this.arrayTipoDocumento = res.data;
  }

  cambiarOptionDato() {
    if (this.form.controls["optionDatos"].value) {
      this.form.controls["nombre"].setValue(this.dataUser?.nombre);
      this.form.controls["telefono"].setValue(this.dataUser?.telefono);
      this.form.controls["email"].setValue(this.dataUser?.email);
      this.form.controls["numero_identidad"].setValue(this.dataUser?.numero_documento);
      this.form.controls["tipo_identidad"].setValue(this.dataUser?.tipo_documentacion_id);
    } else {
      this.form.controls["nombre"].setValue('');
      this.form.controls["telefono"].setValue('');
      this.form.controls["email"].setValue('');
      this.form.controls["numero_identidad"].setValue('');
      this.form.controls["tipo_identidad"].setValue('');
    }
  }

  async pagar(event:any) {
    this.services.addLoading(event.target);
    const data = this.form.getRawValue();

    const datos = {
      code: data.banco,
      propiedad: this.dataPago.usuario_has_propiedad_propiedad_id,
      user: this.dataPago.usuario_has_propiedad_usuario_id,
      precio: this.dataPago.precio,
      id: this.dataPago.id,
      ...data
    }

    console.log(datos);
    (await this._pagos.pay(datos)).subscribe((resp:any) => {
      console.log(resp);
      this.dataUser.nombre = data.nombre;
      this.dataUser.telefono = data.telefono;
      this.dataUser.numero_documento = data.numero_identidad;
      this.dataUser.tipo_documentacion_id = data.tipo_identidad;
      localStorage.setItem('dataUser', JSON.stringify(this.dataUser));
      this.services.removeLoading(event.target);
      if (resp.body.psePaymentURL != "ERROR") {
        this.services.abrir(resp.body.psePaymentURL, '_self');
      } else {
        this.services.Alert('error', '', resp.body.pseStatusDescription, 'Aceptar', '');
      }
    });
  }
}
