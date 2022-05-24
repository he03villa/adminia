import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  savePropietario(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/savePropietario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  savePropiedad(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/savePropiedad.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  listarTipoPropiedad() {
    const url = `${ this.servicios.ApiURL }/propiedad/listarTipoPropiedad.php`;
    return this.servicios.Promet(this.Data.metodoGet(url));
  }
}
