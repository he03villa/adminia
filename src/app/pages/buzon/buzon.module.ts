import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuzonRoutingModule } from './buzon-routing.module';
import { BuzonComponent } from './buzon.component';


@NgModule({
  declarations: [BuzonComponent],
  imports: [
    CommonModule,
    BuzonRoutingModule
  ]
})
export class BuzonModule { }
