import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { RevicionService } from '../../services/revicion.service';
import { PropiedadService } from '../../services/propiedad.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  arrayTipoRevision = [];
  arrayPropietarios = [];
  arrayDocumento = [];
  documento = false;
  propiedad = false;

  constructor(
    public services: ServicesService,
    private Revicion: RevicionService,
    private Propiedad: PropiedadService,
    private Dashboar: DashboardComponent
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    this.propiedad = propiedad ? true : false;
    this.cargarListarTipo();
    if (!this.propiedad) {
      this.listarPropietarios(user.id);
    }
  }

  async cargarListarTipo() {
    const res:any = await this.Revicion.getAllTipoRevision();
    console.log(res);
    this.arrayTipoRevision = res.data;
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    console.log(res);
    this.arrayPropietarios = res.data;
  }

  abrirModal() {
    this.Dashboar.arrayPropietarios = this.arrayPropietarios;
    this.Dashboar.arrayTipoRevision = this.arrayTipoRevision;
  }

  async verDocumento(item) {
    if (!this.propiedad) {
      const user = JSON.parse(localStorage.getItem('dataUser'));
      const data  = { cojunto: user.id, tipo_revision: item.id };
      const res:any = await this.Revicion.getRevisionPropiedad(data);
      console.log(res);
      this.documento = true;
      this.arrayDocumento = res.data;
    } else {
      const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
      const data  = { propiedad: propiedad.id, tipo_revision: item.id };
      const res:any = await this.Revicion.getRevision(data);
      console.log(res);
      this.documento = true;
      this.arrayDocumento = res.data;
    }
  }

  atras() {
    this.arrayDocumento = [];
    this.documento = false;
  }

}
