import { Component, OnInit } from '@angular/core';
import { PropiedadService } from '../../services/propiedad.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-copropiedades',
  templateUrl: './copropiedades.component.html',
  styleUrls: ['./copropiedades.component.scss']
})
export class CopropiedadesComponent implements OnInit {

  arrayPropiedad = [];

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService
  ) { }

  ngOnInit() {
    this.cargarPropiedad();
  }

  async cargarPropiedad() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const res:any = await this.Propiedad.listarPropiedad({ user: user.id });
    this.arrayPropiedad = res.data;
    console.log(this.arrayPropiedad);
  }

}
