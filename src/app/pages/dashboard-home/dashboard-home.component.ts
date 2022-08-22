import { Component, OnInit } from '@angular/core';
import { MuroService } from '../../services/muro.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  page = 0;
  arrayMuro = [];
  descripcionMuro = '';
  comentario = '';
  propiedad;

  constructor(
    public services: ServicesService,
    private Muro: MuroService,
  ) { }

  ngOnInit() {
    this.cargarMuro(1);
  }

  async cargarMuro(page) {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    this.propiedad = propiedad;
    this.page = page;
    const data = {
      pagina: this.page,
      conjunto: propiedad ? propiedad.cojunto_id : user.id
    };
    const res:any = await this.Muro.getListPropietario(data);
    this.arrayMuro = res.data;
  }

  async saveMuro(event) {
    this.services.addLoading(event.target);
    if (this.validarMuro()) {
      const user = JSON.parse(localStorage.getItem('dataUser'));
      const data = {
        conjunto: user.conjunto,
        descripcion: this.descripcionMuro,
        cojunto: this.propiedad.cojunto_id,
        user: user.id
      };
      const res:any = await this.Muro.saveMuro(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.arrayMuro.unshift(res.data);
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  async saveComentario(event, muro) {
    this.services.addLoading(event.target);
    if (this.validarComentario()) {
      const user = JSON.parse(localStorage.getItem('dataUser'));
      const data = {
        conjunto: user.conjunto,
        comentario: this.comentario,
        muro: muro,
        user: user.id
      };
      const res:any = await this.Muro.saveComentario(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        const post = this.arrayMuro.findIndex(f => f.id == muro);
        this.arrayMuro[post].comentario.unshift(res.data);
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  validarMuro() {
    if (!this.services.validarText(this.descripcionMuro)) {
      this.services.Alert('warning', '', 'La descripción de la publicación está vacía', 'Aceptar', '');
      return false;
    }
    return true;
  }

  validarComentario() {
    if (!this.services.validarText(this.comentario)) {
      this.services.Alert('warning', '', 'La descripción de la publicación está vacía', 'Aceptar', '');
      return false;
    }
    return true;
  }

}
