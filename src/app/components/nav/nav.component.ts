import { Component, OnInit, Directive as  } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NotificacionService } from '../../services/notificacion.service';
import { Router } from '@angular/router';

@()
@Directive()
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
  text = '';
  text2 = '';


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
    this.text = `Hola!!👋🏼👋🏼😀😀%0ATe invito a que te unas a nuestro conjunto residencial🏠, así recibirás y tendrás acceso a toda la información de tu propiedad!%0AHacerlo es muy fácil!!!💥💥%0ASigue los siguientes pasos:%0A1) Ingresa a Admina.com.co%0A2) Crea un usuario como propietario%0A3) Ingresa el siguiente código en “agregar propiedad”%0AY listo!!%0A%0A💥💥El código de tu conjunto residencial es el siguiente:👇🏼👇🏼%0A ${this.dataUser.codigo}`;
    this.text2 = this.text.split('%0A').join('\n');
  }

  compartirWhatsapp() {
    /* https://api.whatsapp.com/send?text= */
    const content = `https://api.whatsapp.com/send?text=${this.text}`;
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
