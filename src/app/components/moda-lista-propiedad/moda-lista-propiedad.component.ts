import { ChangeDetectorRef, Component, Input, OnInit, SimpleChange } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, UntypedFormArray } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-moda-lista-propiedad',
  templateUrl: './moda-lista-propiedad.component.html',
  styleUrls: ['./moda-lista-propiedad.component.scss']
})
export class ModaListaPropiedadComponent implements OnInit {

  @Input() dataPago;
  arrayPropiedades = [];
  valor = 0;
  form: UntypedFormGroup = new UntypedFormGroup({});

  constructor(
    private fb: UntypedFormBuilder,
    private pago: PagosService,
    private services: ServicesService
  ) { }

  ngOnInit() {
    this.cargarFormulario();
  }

  ngOnChanges(change: SimpleChange) {
    console.log(change);
    const data = change['dataPago'].currentValue;
    if (data) {
      this.form.reset();
      this.cargarFormulario();
      this.arrayPropiedades = data.arrayPropietarios;
      this.valor = data.valor;
      this.arrayPropiedades.filter((f:any) => {
        const group = this.addItemForm(f);
        this.getFormilarioArray().push(group);
      });
    }
  }

  cargarFormulario() {
    this.form = this.fb.group({
      listaPropiedad: this.fb.array([])
    });
  }

  getFormilarioArray(): UntypedFormArray {
    return this.form.get('listaPropiedad') as UntypedFormArray;
  }

  addItemForm(item:any): UntypedFormGroup {
    return this.fb.group({
      id: [item.id],
      nombre: [item.nombre],
      option: [false],
    });
  }

  async enviarPago() {
    const dataForm = this.form.getRawValue();
    console.log(dataForm);
    const propiedades = dataForm.listaPropiedad.filter(f => f.option);
    const data = {
      valor: this.valor,
      propiedades: propiedades
    }
    console.log(data);
    const res:any = await this.pago.savePagos(data);
    if (res.status == 'success') {
      this.services.hideModal('#modalListaPropiedades');
      this.services.Alert('success', '', 'Los pagos se guardaron correctamente', 'Aceptar', '');
    }
  }

}
