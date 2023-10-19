import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PagosService } from '../../services/pagos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss']
})
export class PagosComponent implements OnInit {

  arrayPropietarios = [];
  auxArrayPropietarios = [];
  arrayTorre = [];
  arrayPagos = [];
  propiedad;
  dataUser;
  selectTorre = '0';
  tipoStatud = environment.tipoPago;

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
    private Dash: DashboardComponent,
    private _pagos: PagosService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    this.dataUser = user;
    this.propiedad = propiedad;
    if (this.dataUser.conjunto == 0) {
      if (!this.propiedad) {
        this.cagarAllPagos(this.dataUser.id);
      } else {
        console.log(this.propiedad);
        const data = { id_user: this.dataUser.id, id_propiedad: propiedad.id };
        this.cargarPagosUser(data);
      }
    } else if (this.dataUser.conjunto == 1) {
      this.cagarAllPagosAministrador(this.dataUser.id);
    }
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    this.arrayTorre = res.torre;
    if (this.arrayTorre.length > 0) {
      this.selectTorre = this.arrayTorre[0].id;
      this.auxArrayPropietarios = res.data;
      this.arrayPropietarios = this.auxArrayPropietarios.filter(f => f.torre_id == this.selectTorre);
    } else {
      this.arrayPropietarios = res.data;
    }
  }

  cambiarTorre() {
    this.arrayPropietarios = this.auxArrayPropietarios.filter(f => f.torre_id == this.selectTorre);
  }

  async cargarPagosUser(data) {
    const res:any = await this._pagos.getPagoUser(data);
    console.log(res);
    this.arrayPagos = res.data;
  }

  async cagarAllPagos(id) {
    const res:any = await this._pagos.getAllPagos({ id });
    console.log(res);
    this.arrayPagos = res.data;
  }

  async cagarAllPagosAministrador(id) {
    const res:any = await this._pagos.getPagoAdministrador({ id });
    console.log(res);
    this.arrayPagos = res.data;
  }

  async pagar(item) {
    console.log(item);
    console.log(this.dataUser);
    if (this.dataUser.cuentas_bancarias.length == 0) {
      const res = await this.services.Alert('info', '', 'No tienes ninguna cuenta asociada', 'Ir', '');
      console.log(res);
      this.services.url('dashboard/editar-perfil');
      return;
    }
    let htmlOption = '';
    for (const key in this.dataUser.cuentas_bancarias) {
      if (Object.prototype.hasOwnProperty.call(this.dataUser.cuentas_bancarias, key)) {
        const element = this.dataUser.cuentas_bancarias[key];
        htmlOption += `<option value="${ element.code }">${ element.nombre }</option>`;
      }
    }
    const html = `
      <div class="container">
        <p>El valor a pagar es <b>${ this.services.formatNumberInteger(item.precio) }</b></p>
        <label>Escoja una cuenta</label>
        <select id="stc-banco" class="swal2-input">
          ${ htmlOption }
        </select>
      </div>
    `;

    const resulAlert = await this.services.AlertAllHTML(html, 'Aceptar', 'stc-banco', true, 'Canselar');
    console.log(resulAlert);
    const data =  {
      code: resulAlert.value,
      propiedad: item.usuario_has_propiedad_propiedad_id,
      user: item.usuario_has_propiedad_usuario_id,
      precio: item.precio,
      id: item.id,
    };
    console.log('ejecunatndo pago');
    (await this._pagos.pay(data)).subscribe((resp:any) => {
      console.log(resp);
      this.services.abrir(resp.body.psePaymentURL);
    });
  }

  async ingresarValor() {
    const res = await this.services.AlertInput('Ingresa el valor', 'Aceptar', 'Canselar', true);
    if (res.isConfirmed ==  true) {
      const data = {
        valor: res.value,
        arrayPropietarios: this.arrayPropietarios
      }
      this.Dash.dataPago = data;
      this.services.showModal('#modalListaPropiedades');
    }
  }

  async getDetallePago(item) {
    console.log(item);
    const data = { businessId: item.id, payoutId: item.idPayout };
    const res:any = await this._pagos.getPagoDetalle(data);
    this.Dash.dataDetallePago = { detallePagoLocal: item, detallePagoMelo: res.body };
    this.services.showModal('#modalDetallePago');
    console.log(res.body);
  }

}
