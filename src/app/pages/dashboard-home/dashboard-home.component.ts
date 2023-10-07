import { Component, OnInit, Directive as  } from '@angular/core';
import { MuroService } from '../../services/muro.service';
import { ServicesService } from '../../services/services.service';
import { PagosService } from '../../services/pagos.service';

declare var $ : any;

@()
@Directive()
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
  dataComentario;
  propiedad;
  dataUsuario;

  constructor(
    public services: ServicesService,
    private Muro: MuroService,
    private pago: PagosService
  ) { }

  ngOnInit() {
    this.cargarMuro(1);
    this.cargarPago();
  }

  cargaDatarMuro(item, id) {
    this.dataComentario = item;
    $('.content-muro').removeClass('active');
    $(`#${id}`).addClass('active');
  }

  async cargarPago() {
    let propiedad:any = sessionStorage.getItem('dataPropiedad') || '';
    if (propiedad != '') {
      propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad') || '');
      if (propiedad.pago != null) {
        this.cargarModalAceptacionPago(propiedad.pago);
      } else {
        const res = await this.cargaPagoWb(propiedad.id);
        if (res != null) {
          this.cargarModalAceptacionPago(res.pago);
        }
      }
    }
  }

  async cargaPagoWb(id) {
    const res:any = await this.pago.getPagos({ id });
    return res.data;
  }

  async cargarModalAceptacionPago(pago) {
    if (parseInt(pago.status) == 0) {
      console.log(pago);
      const html = `
        <div class="content-informacion">
          <p>
            El administrador ya monto el pago mensual de la propiedad por un monto de <b>${ pago.pago }</b>.
            Esta decuerdo con el moneto establecido
          </p>
        </div>
      `;
      const res = await this.services.Alert('info', '', html, 'Aceptar', 'Rechazar', true, false, false);
      let descripcion = '';
      if (res.isDismissed) {
        const resInpu:any = await this.services.AlertInput('Ingrese la descipcion de rezachar el valor del arriendo', 'Aceptar', '', false, false, false);
        console.log(resInpu);
        descripcion = resInpu.value;
      }
      let status = res.isConfirmed ? 1 : (res.isDismissed ? 2 : 0);
      const data = { id: pago.id, status, descripcion };
      console.log(data);
      const response:any = await this.pago.updatePagosStatus(data);
      if (response.status == 'success') {
        pago.status = status;
        const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad') || '');
        propiedad.pago = pago;
        sessionStorage.setItem('dataPropiedad', JSON.stringify(propiedad));
      }
    }
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
    this.dataUsuario = user;
    const res:any = await this.Muro.getListPropietario(data);
    this.arrayMuro = res.data;
    setTimeout(() => {
      this.cargaDatarMuro(this.arrayMuro[0], 0);
    }, 1000);
  }

  async saveMuro(event) {
    this.services.addLoading(event.target);
    if (this.validarMuro()) {
      const user = JSON.parse(localStorage.getItem('dataUser'));
      const data = {
        conjunto: user.conjunto,
        descripcion: this.descripcionMuro,
        cojunto: this.propiedad ? this.propiedad.cojunto_id : user.id,
        user: user.id
      };
      const res:any = await this.Muro.saveMuro(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        this.descripcionMuro = '';
        this.arrayMuro.unshift(res.data);
      }
      this.services.removeLoading(event.target);
    } else {
      this.services.removeLoading(event.target);
    }
  }

  async saveComentario(event, muro, comentario) {
    this.services.addLoading(event.target);
    if (this.validarComentario(comentario)) {
      const user = JSON.parse(localStorage.getItem('dataUser'));
      const data = {
        conjunto: user.conjunto,
        comentario: comentario,
        muro: muro,
        user: user.id
      };
      const res:any = await this.Muro.saveComentario(data);
      this.services.Alert(res.status, '', res.message, 'Aceptar', '');
      if (res.status == 'success') {
        const post = this.arrayMuro.findIndex(f => f.id == muro);
        this.arrayMuro[post].comentario = '';
        this.arrayMuro[post].comentarios.unshift(res.data);
        /* this.dataComentario.comentarios.unshift(res.data); */
        this.comentario = '';
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

  validarComentario(comentario) {
    if (!this.services.validarText(comentario)) {
      this.services.Alert('warning', '', 'La descripción de la publicación está vacía', 'Aceptar', '');
      return false;
    }
    return true;
  }

}
