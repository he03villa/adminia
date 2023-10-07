import { Component, OnDestroy, OnInit, Directive as  } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';
import { AutocompleteService } from '../../services/autocomplete.service';

@()
@Directive()
@Component({
  selector: 'app-crearcopropiedad',
  templateUrl: './crearcopropiedad.component.html',
  styleUrls: ['./crearcopropiedad.component.scss']
})
export class CrearcopropiedadComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup = new UntypedFormGroup({});
  validarMensaje = true;
  $_autoComplete;
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
    private fb: UntypedFormBuilder,
    private Propiedad: PropiedadService,
    private autoComplete: AutocompleteService
  ) { }

  async ngOnInit() {
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
      cantidad_propiedad: [0, [Validators.required]], */
      confirmar_password: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
    this.cargarTipo();
    this.autoComplete.cargarAutoComplete('pac-input');
    this.$_autoComplete = this.autoComplete.autoCompleto.subscribe(res => {
      this.form.controls.direccion.setValue(res.direccion);
      this.form.controls.ciudad.setValue(res.ciudad);
      this.form.controls.departamento.setValue(res.departamento);
      this.form.controls.codigo_postal.setValue(res.codigoPos);
    });
  }

  ngOnDestroy() {
    if (this.$_autoComplete) {
      this.$_autoComplete.unsubscribe();
    }
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
        this.dataEdificioPartamento.arrayNumeroPiso.push([{ piso_inicio: 0, piso_fin: 0, cantdad: 0 }]);
      }
    }
  }

  pushArrayNumeroPisoLlenar(item:any) {
    console.log(item);
    const res = item[0];
    item.push({ piso_inicio: res.piso_fin + 1, piso_fin: 0, cantdad: 0 });
  }

  llenarSiguiente(item:any) {
    console.log(item);
    if (item[item.length - 2]) {
      item[item.length - 1].piso_inicio = item[item.length - 2].piso_fin + 1
    }
  }

  llenarArrayNombreEdificio() {
    this.arrayNombreEdificio = [];
    if (this.dataEdificioPartamento.numero_torres > 0) {
      for (let y = 0; y < this.dataEdificioPartamento.numero_torres; y++) {
        this.arrayNombreEdificio.push({ torre: y + 1, array: [] });
      }
      for (let x = 0; x < this.dataEdificioPartamento.arrayNumeroPiso.length; x++) {
        const element = this.dataEdificioPartamento.arrayNumeroPiso[x];
        for (let j = 0; j < element.length; j++) {
          const elementi = element[j];
          if (elementi.piso_inicio > 0 && elementi.cantdad > 0) {
            const lent = elementi.piso_inicio >= elementi.piso_fin ? 1 : ((elementi.piso_fin - elementi.piso_inicio) + 1);
            for (let i = 0; i < lent; i++) {
              for (let b = 0; b < elementi.cantdad; b++) {
                const numero = ((i + elementi.piso_inicio) * 100) + (b + 1);
                const post = this.arrayNombreEdificio.findIndex(f => f.torre == x + 1);
                this.arrayNombreEdificio[post].array.push({ name: numero });
              }
            }
          }
        }
      }
    }
  }

  llenarArray() {
    if (this.services.validarText(this.dataUbanizacionCasa.nombre_nomezclatura) && this.services.validarNumero(this.dataUbanizacionCasa.cantidad_propiedad) && this.services.validarNumero(this.dataUbanizacionCasa.inicio_nomezclatura)) {
      this.arrayNombre = [];
      for (let index = 0; index < this.dataUbanizacionCasa.cantidad_propiedad; index++) {
        this.arrayNombre.push(this.dataUbanizacionCasa.nombre_nomezclatura + ' ' + (this.dataUbanizacionCasa.inicio_nomezclatura + index));
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
      if (this.form.controls.password.value != this.form.controls.confirmar_password.value) {
        this.services.Alert('error', '', 'Las contraseñas no coinciden', 'Aceptar', '');
        this.services.removeLoading(event.target);
        return false;
      }
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
        this.services.Alert('error', '', res.message, 'Aceptar', '');
      }
      this.services.removeLoading(event.target);
    } else {
      this.validarMensaje = false;
      this.services.removeLoading(event.target);
    }
  }

}
