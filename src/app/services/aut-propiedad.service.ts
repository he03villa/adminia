import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AutPropiedadService implements CanActivate {

  constructor(
    private services: ServicesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    console.log(propiedad);
    if (!propiedad) {
      return true;
    }
    this.services.url('/dashboard/documento');
    return false;
  }
}
