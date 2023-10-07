import { Component, OnInit, Directive as  } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@()
@Directive()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataUser;
  arrayTipoRevision = [];
  arrayPropietarios = [];
  dataPago;
  propiedad;
  dataPropietario;

  constructor(
    public services: ServicesService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const propiedad = JSON.parse(sessionStorage.getItem('dataPropiedad'))
    this.dataUser = user;
    this.propiedad = propiedad;
  }

}
