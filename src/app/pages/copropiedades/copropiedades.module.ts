import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CopropiedadesRoutingModule } from './copropiedades-routing.module';
import { CopropiedadesComponent } from './copropiedades.component';


@NgModule({
  declarations: [CopropiedadesComponent],
  imports: [
    CommonModule,
    CopropiedadesRoutingModule
  ]
})
export class CopropiedadesModule { }
