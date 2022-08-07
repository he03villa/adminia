import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRevisionesRoutingModule } from './historial-revisiones-routing.module';
import { HistorialRevisionesComponent } from './historial-revisiones.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [HistorialRevisionesComponent],
  imports: [
    CommonModule,
    HistorialRevisionesRoutingModule,
    ComponentsModule
  ]
})
export class HistorialRevisionesModule { }
