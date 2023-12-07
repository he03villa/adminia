import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Injectable({
  providedIn: 'root'
})
export class ReferidoGuard implements CanActivate {
  _services : ServicesService = inject(ServicesService);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const codigo = this._services.urlParam('ref');
    if (codigo != null) {
      sessionStorage.setItem('ref', codigo);
    }
    return true;
  }
  
}
