import { Component, Input, OnInit, SimpleChange, Directive as  } from '@angular/core';

@()
@Directive()
@Component({
  selector: 'app-modal-acaptar-pago',
  templateUrl: './modal-acaptar-pago.component.html',
  styleUrls: ['./modal-acaptar-pago.component.scss']
})
export class ModalAcaptarPagoComponent implements OnInit {

  @Input() dataPago;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChange) {
    this.dataPago = change['dataPago'].currentValue;
  }

}
