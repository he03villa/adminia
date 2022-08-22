import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class MuroService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  getListPropietario(data) {
    const url = `${ this.servicios.ApiURL }/muro/getListPropietario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveMuro(data) {
    const url = `${ this.servicios.ApiURL }/muro/saveMuro.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updateMuro(data) {
    const url = `${ this.servicios.ApiURL }/muro/updateMuro.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  deleteMuro(data) {
    const url = `${ this.servicios.ApiURL }/muro/deleteMuro.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveComentario(data) {
    const url = `${ this.servicios.ApiURL }/muro/saveComentario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updateComentario(data) {
    const url = `${ this.servicios.ApiURL }/muro/updateComentario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  deleteComentario(data) {
    const url = `${ this.servicios.ApiURL }/muro/deleteComentario.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
