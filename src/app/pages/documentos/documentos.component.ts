import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { RevicionService } from '../../services/revicion.service';
import { PropiedadService } from '../../services/propiedad.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  arrayTipoRevision = [];
  arrayPropietarios = [];
  arrayDocumento = [];
  documento = false;
  propiedad = false;

  constructor(
    public services: ServicesService,
    private Revicion: RevicionService,
    private Propiedad: PropiedadService,
    private Dashboar: DashboardComponent
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    this.propiedad = propiedad ? true : false;
    this.cargarListarTipo();
    if (!this.propiedad) {
      this.listarPropietarios(user.id);
    }
  }

  async cargarListarTipo() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
    const data = { cojunto: propiedad ? propiedad.cojunto_id : user.id };
    const res:any = await this.Revicion.getAllTipoRevision(data);
    this.arrayTipoRevision = res.data;
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    this.arrayPropietarios = res.data;
  }

  abrirModal() {
    this.Dashboar.arrayPropietarios = this.arrayPropietarios;
    this.Dashboar.arrayTipoRevision = this.arrayTipoRevision;
  }

  async verDocumento(item) {
    if (!this.propiedad) {
      const user = JSON.parse(localStorage.getItem('dataUser'));
      const data  = { cojunto: user.id, tipo_revision: item.id };
      const res:any = await this.Revicion.getRevisionPropiedad(data);
      this.documento = true;
      this.arrayDocumento = res.data;
    } else {
      const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'));
      const data  = { propiedad: propiedad.id, tipo_revision: item.id };
      const res:any = await this.Revicion.getRevision(data);
      this.documento = true;
      this.arrayDocumento = res.data;
    }
  }

  atras() {
    this.arrayDocumento = [];
    this.documento = false;
  }

  async abrirModalCrearCarpeta(item) {
    let data;
    if (!item) {
      data = { nombre: '', descripcion: '' };
    } else {
      data = item;
    }
    console.log(data);
    let html = `
      <div class="group-form">
        <label>Nombre</label>
        <input type="text" id="carpeta-nombre" value="${ data.nombre }">
      </div>
      <div class="group-form">
        <label>Descripción</label>
        <input type="text" id="carpeta-descripcion" value="${ data.descripcion }">
      </div>
    `;
    const dato:any = await Swal.fire({
      title: 'Carpeta',
      html: html,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      backdrop: true,
      customClass: {
        htmlContainer: 'content-group-form'
      },
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        const nombre = document.getElementById('carpeta-nombre')['value'];
        const descripcion = document.getElementById('carpeta-descripcion')['value'];
        if (!this.services.validarText(nombre)) {
          Swal.showValidationMessage(`El nombre está vacío`);
        } else if (!this.services.validarText(descripcion)) {
          Swal.showValidationMessage(`La descripción está vacío`);
        }
        const user = JSON.parse(localStorage.getItem('dataUser'));
        const datos = { nombre, descripcion, cojunto: user.id };
        let res:any;
        if (!item) {
          res = await this.Revicion.saveTipoRevicion(datos);
        } else {
          datos['id'] = data.id;
          res = await this.Revicion.updateTipoRevicion(datos);
        }
        if (res.status == 'success') {
          return res;
        } else {
          Swal.showValidationMessage(res.message);
        }
      }
    });
    if (dato.isConfirmed) {
      this.services.Alert(dato.value.status, '', dato.value.message, 'Aceptar', '');
      if (!item) {
        this.arrayTipoRevision.unshift(dato.value.data);
      } else {
        const post = this.arrayTipoRevision.findIndex(f => f.id == dato.value.data.id);
        this.arrayTipoRevision[post] = dato.value.data;
      }
    }
  }

  async deleteCarpeta(item) {
    const res:any = await this.services.Alert('info', '', 'Esta seguro en eliminar esta carpeta', 'Aceptar', 'Canselar', true);
    if (res.isConfirmed) {
      const data = { id: item.id };
      const resp:any = await this.Revicion.deleteTipoRevicion(data);
      this.services.Alert(resp.status == 'success' ? 'success' : 'error', '', resp.message, 'Aceptar', '');
      if (resp.status == 'success') {
        const post = this.arrayTipoRevision.findIndex(f => f.id == data.id);
        this.arrayTipoRevision.splice(post, 1);
      }
    }
  }

}
