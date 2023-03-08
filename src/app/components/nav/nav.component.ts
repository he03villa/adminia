import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NotificacionService } from '../../services/notificacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  panelOpenState = false;
  dataUser;
  arrayNotificaion = [];
  numeroNoVisto = 0;


  constructor(
    public services: ServicesService,
    private Dashboard: DashboardComponent,
    private Notificacion: NotificacionService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
    this.cargarNotificacion();
  }

  compartirWhatsapp() {
    /* https://api.whatsapp.com/send?text= */
    const content = `https://api.whatsapp.com/send?text=${this.dataUser.codigo}`;
    this.services.abrir(content);
  }

  atras() {
    this.Dashboard.propiedad = undefined;
    sessionStorage.removeItem('dataPropiedad');
    this.services.url('/dashboard/copropiedades');
  }

  async cargarNotificacion() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    const res: any = await this.Notificacion.getAllNotificacionUser({ id: user.id, cojunto: user.conjunto });
    this.arrayNotificaion = res.data;
    this.numeroNoVisto = this.arrayNotificaion.filter(f => f.visto == '0').length;
    console.log(this.numeroNoVisto);
  }

  async abrirModalNotificacion() {
    const res = await this.Notificacion.ponerVisto({ user: this.dataUser.id });
    this.numeroNoVisto = 0;
    this.services.showModal('#modal-notificaion');
  }


  editarperfil() {
    this.router.navigate(['dashboard/editar-perfil']);
  }

}
