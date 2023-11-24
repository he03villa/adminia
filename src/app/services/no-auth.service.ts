import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthService implements CanActivate {

  constructor(
    private services: ServicesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    /* localStorage.removeItem('dataUser'); */
    const user = JSON.parse(localStorage.getItem('dataUser'));
    console.log(user);
    if (!user) {
      return true;
    }
    let url = '';
    if (user.conjunto == 0) {
      url = 'dashboard';
    } else if (user.conjunto == 1) {
      url = 'dashboard/propietarios';
    }
    this.services.url(url);
    return false;
  }
}
