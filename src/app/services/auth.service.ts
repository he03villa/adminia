import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(
    private services: ServicesService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    if (user) {
      return true;
    }
    this.services.url('/login');
    return false;
  }
}
