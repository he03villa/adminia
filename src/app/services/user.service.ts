import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new EventEmitter();

  constructor(
    private Data: DataService,
    private servicios: ServicesService
  ) { }

  cambiar(data) {
    this.user.emit(data);
  }

  Login(data) {
    const url = `${ this.servicios.ApiURL }/usuario/login.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveUser(data) {
    const url = `${ this.servicios.ApiURL }/usuario/saveUser.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
