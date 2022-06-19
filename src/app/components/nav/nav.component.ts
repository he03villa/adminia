import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  panelOpenState = false;
  dataUser;

  constructor(
    public services: ServicesService
  ) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    this.dataUser = user;
  }

  compartirWhatsapp() {
    /* https://api.whatsapp.com/send?text= */
    const content = `https://api.whatsapp.com/send?text=${ this.dataUser.codigo }`;
    this.services.abrir(content);
  }

}
