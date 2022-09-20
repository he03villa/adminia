import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteRoutingModule } from './reporte-routing.module';
import { ReporteComponent } from './reporte.component';


@NgModule({
  declarations: [ReporteComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule
  ]
})
export class ReporteModule { }
