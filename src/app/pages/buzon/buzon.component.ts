import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.scss']
})
export class BuzonComponent implements OnInit {

  arrayPropietarios = [];
  propiedad;

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    this.propiedad = propiedad;
    if (!this.propiedad) {
      this.listarPropietarios(user.id);
    }
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    this.arrayPropietarios = res.data;
  }

  compartirWhatsapp(numero) {
    /* https://api.whatsapp.com/send?text= */
    const content = `https://api.whatsapp.com/send?phone=57${ numero }`;
    this.services.abrir(content);
  }

}
