import { Component, OnInit, Directive as  } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { RevicionService } from '../../services/revicion.service';

@()
@Directive()
@Component({
  selector: 'app-historial-revisiones',
  templateUrl: './historial-revisiones.component.html',
  styleUrls: ['./historial-revisiones.component.scss']
})
export class HistorialRevisionesComponent implements OnInit {

  arrayTipoRevision = [];
  arrayDocumento = [];
  documento = false;
  propiedad = false;

  constructor(
    public services: ServicesService,
    private Revicion: RevicionService,
  ) { }

  ngOnInit() {
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    this.propiedad = propiedad ? true : false;
    this.cargarListarTipo();
  }

  async cargarListarTipo() {
    const data = { tipo: [3] }
    const res:any = await this.Revicion.getAllTipoRevision(data);
    console.log(res);
    this.arrayTipoRevision = res.data;
  }

  async verDocumento(item) {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const data  = { cojunto: user.id, tipo_revision: item.id };
    const res:any = await this.Revicion.getRevisionPropiedad(data);
    console.log(res);
    this.documento = true;
    this.arrayDocumento = res.data;
    /* if (!this.propiedad) {
    } else {
      const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
      const data  = { propiedad: propiedad.id, tipo_revision: item.id };
      const res:any = await this.Revicion.getRevision(data);
      console.log(res);
      this.documento = true;
      this.arrayDocumento = res.data;
    } */
  }

  atras() {
    this.arrayDocumento = [];
    this.documento = false;
  }

}
