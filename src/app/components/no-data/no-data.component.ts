import { Component, OnInit, Directive as  } from '@angular/core';

@()
@Directive()
@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss']
})
export class NoDataComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
