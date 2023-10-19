import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { UserService } from './user.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ActivarPropiedadService implements CanActivate {

  constructor(
    private services: ServicesService,
    private User: UserService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = this.services.urlParam('propiedad');
    console.log(id);
    if (id) {
      console.log(id);
      const data = { id: id };
      const res:any = await this.User.activarPropiedad(data);
      if (res.status == 'success') {
        this.services.Alert('success', '', res['message'], 'Aceptar', '', false);
      } else {
        this.services.Alert('error', '', res['message'], 'Aceptar', '', false);
      }
      /* this.services.url('/login'); */
    }
    return true;
  }
}
