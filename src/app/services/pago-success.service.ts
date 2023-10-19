import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';
import { PagosService } from './pagos.service';

@Injectable({
  providedIn: 'root'
})
export class PagoSuccessService implements CanActivate {

  constructor(
    private services: ServicesService,
    private _pago: PagosService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = this.services.urlParam('id');
    if (id) {
      const data = { id };
      const res:any = await this._pago.pagoSuccess(data);
      /* console.log(res); */
      if (res.status == 'success') {
        this.services.Alert('success', '', 'El pago se proceso exitosamente', 'Aceptar', '', false);
      }/*  else {
        this.services.Alert('error', '', res['message'], 'Aceptar', '', false);
      } */
    }
    return true;
  }
}
