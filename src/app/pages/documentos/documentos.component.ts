import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { RevicionService } from '../../services/revicion.service';
import { PropiedadService } from '../../services/propiedad.service';
declare var $ : any;

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss']
})
export class DocumentosComponent implements OnInit {

  arrayTipoRevision = [];
  arrayPropietarios = [];

  constructor(
    public services: ServicesService,
    private Revicion: RevicionService,
    private Propiedad: PropiedadService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.cargarListarTipo();
    this.listarPropietarios(user.id);
  }

  async cargarListarTipo() {
    const res:any = await this.Revicion.getAllTipoRevision();
    console.log(res);
    this.arrayTipoRevision = res.data;
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    console.log(res);
    this.arrayPropietarios = res.data;
  }

  async cambioArchivo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.size >= 5000000) {
        this.services.Alert('warning', '', 'El tamaño de la imagen debe de ser menor a 5 M.B.', 'Aceptar', false);
        return;
      } else if (file.type != 'application/pdf') {
        this.services.Alert('warning', '', 'Solo se permite imagen con el formato pdf', 'Aceptar', false);
        return;
      }
      const res = await this.services.cargar_img(file);
      $(event.target).val('');
      console.log(res, file);
    }
  }

}
