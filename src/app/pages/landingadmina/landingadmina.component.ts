import { Component, OnInit, Directive as  } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../../services/services.service';

@()
@Directive()
@Component({
  selector: 'app-landingadmina',
  templateUrl: './landingadmina.component.html',
  styleUrls: ['./landingadmina.component.scss']
})
export class LandingadminaComponent implements OnInit {

  constructor(
    public services: ServicesService
  ) { }
  standalone: true;
  ngOnInit() {
  }

}
