import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActivarUserService implements CanActivate {

  constructor(
    private services: ServicesService,
    private User: UserService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = this.services.urlParam('propietario');
    if (id) {
      console.log(id);
      const data = { id: id };
      const res:any = await this.User.activarUser(data);
      if (res.status == 'success') {
        this.services.Alert('success', '', res['message'], 'Aceptar', '', false);
      } else {
        this.services.Alert('error', '', res['message'], 'Aceptar', '', false);
      }
      this.services.url('/login');
    }
    return true;
  }
}
