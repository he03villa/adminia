import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class LanzamientoService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  saveLanzamiento(data) {
    const url = `${ this.servicios.ApiURL }/lanzamiento/saveLanzamiento.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
