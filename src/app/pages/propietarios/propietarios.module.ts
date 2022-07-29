import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietariosRoutingModule } from './propietarios-routing.module';
import { PropietariosComponent } from './propietarios.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PropietariosComponent],
  imports: [
    CommonModule,
    PropietariosRoutingModule,
    FormsModule
  ]
})
export class PropietariosModule { }
