import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietariosRoutingModule } from './propietarios-routing.module';
import { PropietariosComponent } from './propietarios.component';


@NgModule({
  declarations: [PropietariosComponent],
  imports: [
    CommonModule,
    PropietariosRoutingModule
  ]
})
export class PropietariosModule { }
