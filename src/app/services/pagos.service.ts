import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  savePagos(data) {
    const url = `${ this.servicios.ApiURL }/pagos/savePagos.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updatePagosStatus(data) {
    const url = `${ this.servicios.ApiURL }/pagos/updatePagoStatus.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getPagos(data) {
    const url = `${ this.servicios.ApiURL }/pagos/getPago.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  listbank() {
    const url = `${ this.servicios.ApiURL }/pagos/getListBanco.php`;
    return this.servicios.Promet(this.Data.metodoGet(url));
  }
}
