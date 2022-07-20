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

  LoginPropiedad(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/login.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  saveUser(data) {
    const url = `${ this.servicios.ApiURL }/usuario/saveUser.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  activarUser(data) {
    const url = `${ this.servicios.ApiURL }/usuario/activarUser.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updateUser(data) {
    const url = `${ this.servicios.ApiURL }/usuario/updateUser.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  updatePassword(data) {
    const url = `${ this.servicios.ApiURL }/usuario/updatePassword.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }

  activarPropiedad(data) {
    const url = `${ this.servicios.ApiURL }/propiedad/activarPropiedad.php`;
    return this.servicios.Promet(this.Data.metodoPost(url, data));
  }
}
