import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  getAllNotificacionUser(data) {
    const url = `${ this.servicios.ApiURL }/notificacion/getAllNotificacionUser.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  ponerVisto(data) {
    const url = `${ this.servicios.ApiURL }/notificacion/ponerVisto.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
