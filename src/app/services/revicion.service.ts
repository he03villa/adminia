import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class RevicionService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  getAllTipoRevision(data) {
    const url = `${ this.servicios.ApiURL }/revision/getAllTipoRevision.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getRevision(data) {
    const url = `${ this.servicios.ApiURL }/revision/getRevision.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getRevisionPropiedad(data) {
    const url = `${ this.servicios.ApiURL }/revision/getRevisionPropiedad.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveRevicion(data) {
    const url = `${ this.servicios.ApiURL }/revision/saveRevicion.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveRevicionVisita(data) {
    const url = `${ this.servicios.ApiURL }/revision/saveRevicionVisita.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveRevicionVisita2(data) {
    const url = `${ this.servicios.ApiURL }/revision/saveRevicionVisita2.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
