import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';


@NgModule({
  declarations: [PagosComponent],
  imports: [
    CommonModule,
    PagosRoutingModule
  ]
})
export class PagosModule { }
