import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  fecha = 0;

  constructor() { }

  ngOnInit() {
    this.fecha = new Date().getFullYear();
  }

}
