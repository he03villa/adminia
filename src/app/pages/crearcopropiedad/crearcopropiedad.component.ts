import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-crearcopropiedad',
  templateUrl: './crearcopropiedad.component.html',
  styleUrls: ['./crearcopropiedad.component.scss']
})
export class CrearcopropiedadComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  validarMensaje = true;
  arrayTipo = [];
  arrayNombre = [];
  arrayNombreEdificio = [];
  dataUbanizacionCasa = {
    nombre_nomezclatura: '',
    cantidad_propiedad: 0,
    inicio_nomezclatura: 0
  };
  dataEdificioPartamento = {
    numero_torres: 0,
    arrayNumeroPiso: []
  };

  constructor(
    public services: ServicesService,
    private fb: FormBuilder,
    private Propiedad: PropiedadService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
      codigo_postal: ['', [Validators.required, Validators.maxLength(7)]],
      tipo_propiedad_id: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      /* inicio_nomezclatura: [0, [Validators.required]],
      cantidad_propiedad: [0, [Validators.required]],
      nombre_nomezclatura: ['', [Validators.required]], */
      telefono: ['', [Validators.required]],
    });
    this.cargarTipo();
  }

  async cargarTipo() {
    const res:any = await this.Propiedad.listarTipoPropiedad();
    console.log(res);
    this.arrayTipo = res.data;
  }

  cambiarValidarMensaje() {
    this.validarMensaje = true;
  }

  pushArrayNumeroPiso() {
    this.dataEdificioPartamento.arrayNumeroPiso = [];
    if (this.dataEdificioPartamento.numero_torres > 0) {
      for (let x = 0; x < this.dataEdificioPartamento.numero_torres; x++) {
        this.dataEdificioPartamento.arrayNumeroPiso.push({ piso: 0 });
      }
    }
  }

  pushArrayNumeroPisoLlenar(item:any) {
    item.data = [];
    if (item.piso > 0) {
      for (let x = 0; x < item.piso; x++) {
        item.data.push({ inicio_departamentos: 0, cantidad: 0 });
      }
    }
  }

  llenarArrayNombreEdificio() {
    this.arrayNombreEdificio = [];
    if (this.dataEdificioPartamento.numero_torres > 0) {
      for (let y = 0; y < this.dataEdificioPartamento.numero_torres; y++) {
        this.arrayNombreEdificio.push({ torre: y + 1, array: [] });
        if (this.dataEdificioPartamento.arrayNumeroPiso[y].piso > 0) {
          for (let m = 0; m < this.dataEdificioPartamento.arrayNumeroPiso[y].piso; m++) {
            if (this.dataEdificioPartamento.arrayNumeroPiso[y].data[m].inicio_departamentos > 0 && this.dataEdificioPartamento.arrayNumeroPiso[y].data[m].cantidad > 0) {
              console.log(this.dataEdificioPartamento.arrayNumeroPiso[y].data[m]);
              for (let k = 0; k < this.dataEdificioPartamento.arrayNumeroPiso[y].data[m].cantidad; k++) {
                this.arrayNombreEdificio[y].array.push({ name: k + this.dataEdificioPartamento.arrayNumeroPiso[y].data[m].inicio_departamentos });
              }
            }
          }
        }
      }
    }
  }

  llenarArray() {
    if (this.services.validarText(this.form.controls.nombre_nomezclatura.value) && this.services.validarNumero(this.form.controls.cantidad_propiedad.value) && this.services.validarNumero(this.form.controls.inicio_nomezclatura.value)) {
      this.arrayNombre = [];
      for (let index = 0; index < this.form.controls.cantidad_propiedad.value; index++) {
        this.arrayNombre.push(this.form.controls.nombre_nomezclatura.value + ' ' + (this.form.controls.inicio_nomezclatura.value + index));
      }
    } else {
      this.arrayNombre = [];
    }
  }

  async saveCopropiedad(event) {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.services.addLoading(event.target);
    console.log(this.form);
    if (!this.form.invalid) {
      const data  = {
        nombre: this.form.controls.nombre.value,
        direccion: this.form.controls.direccion.value,
        ciudad: this.form.controls.ciudad.value,
        departamento: this.form.controls.departamento.value,
        codigo_postal: this.form.controls.codigo_postal.value,
        tipo_propiedad_id: this.form.controls.tipo_propiedad_id.value,
        /* nombre_nomezclatura: this.form.controls.nombre_nomezclatura.value,
        inicio_nomezclatura: this.form.controls.inicio_nomezclatura.value,
        cantidad_propiedad: this.form.controls.cantidad_propiedad.value, */
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        telefono: this.form.controls.telefono.value,
        urbanizacion: this.dataUbanizacionCasa,
        edificion: this.dataEdificioPartamento
      };
      console.log(data);
      const res:any = await this.Propiedad.savePropiedad(data);
      if (res.status == 'success') {
        const resp = await this.services.Alert('success', '', 'La propiedad se guardo correctamente', 'Aceptar', '');
        /* localStorage.setItem('dataUser', JSON.stringify(res['data'])); */
        this.services.url('/login');
        /* this.services.url('dashboard/copropiedades'); */
      } else {
        this.services.Alert('success', '', res.message, 'Aceptar', '');
      }
      this.services.removeLoading(event.target);
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.target);
    }
  }

}
