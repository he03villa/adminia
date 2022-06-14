import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.scss']
})
export class PropietariosComponent implements OnInit {

  arrayPropietarios = [];

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService
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

}
