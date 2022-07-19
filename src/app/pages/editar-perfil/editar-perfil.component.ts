import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  constructor(
    public services: ServicesService
  ) { }

  ngOnInit() {

  }

  abrirModalcontrasena() {

    this.services.showModal('#ModalCambiarcontrasena');
  }


}
