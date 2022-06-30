import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.scss']
})
export class PropietariosComponent implements OnInit {

  arrayPropietarios = [];

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
    private Dash: DashboardComponent
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.listarPropietarios(user.id);
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    console.log(res);
    this.arrayPropietarios = res.data;
  }

  verInfoPropietario(item) {
    console.log(item);
    this.Dash.dataPropietario = item;
    this.services.showModal('#modal-info-propietario');
  }

}
