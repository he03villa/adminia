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

  listaTipoBanco() {
    const url = `${ this.servicios.ApiURL }/pagos/getAllTipoBanco.php`;
    return this.servicios.Promet(this.Data.metodoGet(url));
  }

  getAllPagos(data) {
    const url = `${ this.servicios.ApiURL }/pagos/getPagoUserAllPropiedad.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getPagoUser(data) {
    const url = `${ this.servicios.ApiURL }/pagos/getPagoUser.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getPagoDetalle(data) {
    const url = `${ this.servicios.ApiURL }/pagos/getPagoDetalle.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  async pay(data) {
    const url = `${ this.servicios.ApiURL }/pagos/pay.php`;
    return this.Data.metodoPost(url, data);
    /* return this.servicios.Promet(this.Data.metodoPost(url, data)); */
    /* return await this.Data.metodoPostAxios(url, data); */
  }

  pagoSuccess(data) {
    const url = `${ this.servicios.ApiURL }/pagos/pagoSuccess.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  getPagoAdministrador(data) {
    const url = `${ this.servicios.ApiURL }/pagos/getPagoAdministrador.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updatePago(data) {
    const url = `${ this.servicios.ApiURL }/pagos/updatePagos.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
