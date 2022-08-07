import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { RevicionService } from '../../services/revicion.service';
import { PropiedadService } from '../../services/propiedad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $ : any;

@Component({
  selector: 'app-modal-crear-revision',
  templateUrl: './modal-crear-revision.component.html',
  styleUrls: ['./modal-crear-revision.component.scss']
})
export class ModalCrearRevisionComponent implements OnInit {

  @Input() tipoRevision;
  @Input() tipoPropiedad;
  form: FormGroup = new FormGroup({});
  arrayTipoRevision = [];
  arrayPropietarios = [];
  dataDocumento = {
    base64: '',
    nombre: '',
    extencion: ''
  };
  validarBaseMensaje = false;

  constructor(
    public services: ServicesService,
    private Revicion: RevicionService,
    private Propiedad: PropiedadService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      tipo_revicion: ['', [Validators.required]],
      propiedad: ['', [Validators.required]]
    });
  }

  ngOnChanges(change: SimpleChange) {
    console.log(change);
    this.arrayPropietarios = change['tipoPropiedad'].currentValue;
    this.arrayTipoRevision = change['tipoRevision'].currentValue;
    this.limpiar();
    if (this.form.controls.propiedad) {
      this.form.controls.propiedad.setValue(this.arrayPropietarios[0].id ? this.arrayPropietarios[0].id : '');
    }
    console.log(this.arrayPropietarios, this.arrayTipoRevision);
  }

  limpiar() {
    console.log(this.form.controls);
    if (this.form.controls.tipo_revicion) {
      this.form.controls.tipo_revicion.setValue('');
      this.form.controls.propiedad.setValue('');
    }
    this.dataDocumento.base64 = '';
    this.dataDocumento.extencion = '';
    this.dataDocumento.nombre = '';
    $('input[type=file]').val('');
  }

  async cambioArchivo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size >= 5000000) {
        this.services.Alert('warning', '', 'El tamaño de la imagen debe de ser menor a 5 M.B.', 'Aceptar', false);
        return;
      } else if (file.type != 'application/pdf') {
        this.services.Alert('warning', '', 'Solo se permite imagen con el formato pdf', 'Aceptar', false);
        return;
      }
      const res:any = await this.services.cargar_img(file);
      this.dataDocumento.base64 = res;
      this.dataDocumento.extencion = file.name.split('.')[1];
      this.dataDocumento.nombre = file.name.split('.')[0];
      console.log(this.dataDocumento);
    }
  }

  async saveRevision() {
    const data  = {
      tipo_revicion: this.form.controls['tipo_revicion'].value,
      propiedad: this.form.controls['propiedad'].value,
      documento: this.dataDocumento
    };
    const res:any = await this.Revicion.saveRevicion(data);
    this.services.Alert(res.status, '', res.message, 'Aceptar', '');
    if (res.status == 'success') {
      $('#modal-save-documento').modal('hide');
    }
  }

  validarBase() {
    if (!this.services.validarText(this.dataDocumento.base64)) {
      this.validarBaseMensaje = true;
      return false;
    }
    this.validarBaseMensaje = false;
    return true;
  }

}
