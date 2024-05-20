import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-landingadmina',
  templateUrl: './landingadmina.component.html',
  styleUrls: ['./landingadmina.component.scss']
})
export class LandingadminaComponent implements OnInit {

  constructor(
    public services: ServicesService
  ) { }

  ngOnInit() {
  }

  showAlert(text) {
    this.services.Alert('', '', text, 'Aceptar', '');
  }

}
