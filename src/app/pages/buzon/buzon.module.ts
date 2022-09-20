import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuzonRoutingModule } from './buzon-routing.module';
import { BuzonComponent } from './buzon.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [BuzonComponent],
  imports: [
    CommonModule,
    BuzonRoutingModule,
    FormsModule
  ]
})
export class BuzonModule { }
