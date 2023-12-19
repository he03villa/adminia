import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { PropiedadService } from '../../services/propiedad.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import * as XLSX from 'xlsx';

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

  constructor(
    public services: ServicesService,
    private Propiedad: PropiedadService,
    private Dash: DashboardComponent
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
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1")

    XLSX.writeFileXLSX(workbook, 'excel.xls', {});
  }

}
