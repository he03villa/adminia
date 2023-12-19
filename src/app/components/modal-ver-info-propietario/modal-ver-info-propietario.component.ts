import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-modal-ver-info-propietario',
  templateUrl: './modal-ver-info-propietario.component.html',
  styleUrls: ['./modal-ver-info-propietario.component.scss']
})
export class ModalVerInfoPropietarioComponent implements OnInit {

  @Input() dataPropietario;
  form: UntypedFormGroup = new UntypedFormGroup({});
  
  
  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
    private fb: UntypedFormBuilder,
    private Pago: PagosService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: [''],
      pago: ['', [Validators.required]],
      fecha: ['', [Validators.required]]
    });
  }

  ngOnChanges(change: SimpleChange) {
    console.log(change);
    this.dataPropietario = change['dataPropietario'].currentValue;
    this.cargarPago();
  }

  cargarPago() {
    this.form.controls?.id.setValue(this.dataPropietario?.id);
    this.form.controls?.pago.setValue(this.dataPropietario?.pago?.pago);
    this.form.controls?.fecha.setValue(this.dataPropietario?.pago?.fecha);
  }

  async aceptarPropietario(event) {
    this.services.addLoading(event.target);
    const data = {
      user: this.dataPropietario.id_user,
      propiedad: this.dataPropietario.id
    };
    console.log(data);
    const res:any = await this.Propiedad.activarPropietario(data);
    this.services.Alert(res.status, '', res.message, 'Aceptar', '');
    this.services.removeLoading(event.target);
    if (res.status == 'success') {
      this.dataPropietario.status = '1';
      this.services.hideModal('#modal-info-propietario');
    }
  }

  async removerPropietario(event) {
    const { value: observacion } = await Swal.fire({
      showCloseButton: true,
      input: 'text',
      icon: "info",
      title: "Observación de la revocación",
      inputPlaceholder: 'Observación',
      customClass: {
        htmlContainer: 'ayuda-amigo'
      },
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      allowOutsideClick: () => !Swal.isLoading(),
      inputValidator: (value) => {
        if (!value) {
          return "error en la observación";
        }
      },
    });
    const data = {
      user: this.dataPropietario.id_user,
      propiedad: this.dataPropietario.id,
      observacion: observacion
    };
    console.log(data);
    const res:any = await this.Propiedad.removerPropietario(data);
    this.services.Alert(res.status, '', res.message, 'Aceptar', '');
    if (res.status == 'success') {
      this.dataPropietario.telefono_user = null;
      this.dataPropietario.status = null;
      this.dataPropietario.nombre_user = null;
      this.dataPropietario.id_user = null;
      this.dataPropietario.email_user = null;
      this.services.hideModal('#modal-info-propietario');
    }
  }

  async actualizarPago(event) {
    this.services.addLoading(event.target);
    const data = this.form.getRawValue();
    console.log(data);
    const res:any = await this.Pago.updatePago(data);
    if (res.status == 'success') {
      this.services.Alert('success', '', 'El valor ser actualizar', 'Aceptar', false);
    }
    this.services.removeLoading(event.target);
  }

}
