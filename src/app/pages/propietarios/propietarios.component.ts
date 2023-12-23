import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as XLSX from 'xlsx';
import { FormGroup } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-propietarios',
  templateUrl: './propietarios.component.html',
  styleUrls: ['./propietarios.component.scss']
})
export class PropietariosComponent implements OnInit {

  arrayPropietarios = [];
  auxArrayPropietarios = [];
  arrayTorre = [];
  selectTorre = '0';
  dataUser;
  form = {
    id: 0,
    documento: {
      nombre: '',
      base: '',
      extencion: ''
    }
  }

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
    private Dash: DashboardComponent,
    private Pagos: PagosService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
    this.listarPropietarios(user.id);
  }

  async listarPropietarios(propiedad) {
    const res:any = await this.Propiedad.getAllPropiedad({ id: propiedad });
    console.log(res);
    this.arrayTorre = res.torre;
    if (this.arrayTorre.length > 0) {
      this.selectTorre = this.arrayTorre[0].id;
      this.auxArrayPropietarios = res.data;
      this.arrayPropietarios = this.auxArrayPropietarios.filter(f => f.torre_id == this.selectTorre);
    } else {
      this.arrayPropietarios = res.data;
    }
  }

  verInfoPropietario(item) {
    console.log(item);
    this.Dash.dataPropietario = item;
    this.services.showModal('#modal-info-propietario');
  }

  cambiarTorre() {
    this.arrayPropietarios = this.auxArrayPropietarios.filter(f => f.torre_id == this.selectTorre);
  }

  async decargarExcel() {
    const res:any = await this.Propiedad.descargarExcel({ id: this.dataUser.id });
    console.log(res.data);
    const data = res.data;

    let workbook = XLSX.utils.book_new();
    let worksheet = XLSX.utils.json_to_sheet(data);

    // first way to add a sheet
    workbook.SheetNames.push('Hoja 1');
    workbook.Sheets['Hoja 1'] = worksheet;

    // second way to add a sheet
    // XLSX.utils.book_append_sheet(work<book, worksheet, "Hoja 1")

    const date = new Date().getTime();

    XLSX.writeFileXLSX(workbook, `excel-${date}.xlsx`, {});
  }

  async subirArchivo(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      const input = document.getElementById('file1');
      const label = document.getElementById('file1-label');
      this.services.addLoading(input);
      this.services.addLoading(label);
      if (file.size >= 1000000) {
        this.services.removeLoading(input);
        this.services.removeLoading(label);
        this.services.Alert('warning', '', 'El tamaño de la imagen debe de ser menor a 5 M.B.', 'Aceptar', false);
        return;
      } else if (file.type != 'application/vnd.ms-excel' && file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        this.services.removeLoading(input);
        this.services.removeLoading(label);
        this.services.Alert('warning', '', 'Solo se permite archivos con el formato xls', 'Aceptar', false);
        return;
      }
      const res:any = await this.services.cargar_img(file);
      this.form.documento.base = res;
      this.form.documento.nombre = file.name;
      this.form.documento.extencion = file.name.split('.')[1];
      this.form.id = this.dataUser?.id;
      console.log(this.form);
      const resp:any = await this.Pagos.savePagos(this.form);
      if (resp.status == 'success') {
        this.services.Alert('success', '', 'Archivo subido', 'Aceptar', false);
        this.listarPropietarios(this.dataUser?.id);
      }
      input['value'] = '';
      this.services.removeLoading(input);
      this.services.removeLoading(label);
    }
  }

}
