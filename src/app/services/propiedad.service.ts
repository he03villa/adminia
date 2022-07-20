import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  propiedad = new EventEmitter();

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

  listarPropiedad(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/listarPropiadad.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getAllPropiedad(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/getAllPropietario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getAllPropiedadPro(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/getAllPropietarioPro.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  listarTipoPropiedad() {
    const url = `${ this.servicios.ApiURL }/propiedad/listarTipoPropiedad.php`;
    return this.servicios.Promet(this.Data.metodoGet(url));
  }

  activarPropietario(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/activarPropietario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  removerPropietario(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/removerPropietario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updatePropietario(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/updateConjunto.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updatePassword(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/updatePassword.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
