import { Component, Input, OnInit, SimpleChange, Directive as  } from '@angular/core';

@()
@Directive()
@Component({
  selector: 'app-modal-notificacion',
  templateUrl: './modal-notificacion.component.html',
  styleUrls: ['./modal-notificacion.component.scss']
})
export class ModalNotificacionComponent implements OnInit {

  @Input() dataNotificaion;
  arrayNotificaion = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    console.log(change);
    this.arrayNotificaion = change['dataNotificaion'].currentValue;
  }

}
