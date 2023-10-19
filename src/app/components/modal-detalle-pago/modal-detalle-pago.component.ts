import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-modal-detalle-pago',
  templateUrl: './modal-detalle-pago.component.html',
  styleUrls: ['./modal-detalle-pago.component.scss']
})
export class ModalDetallePagoComponent implements OnInit {
  @Input() dataDetallePago;

  ngOnInit() {
    
  }

  ngOnChanges(change: SimpleChange) {
    console.log(change);
    console.log(this.dataDetallePago);
  }
}
