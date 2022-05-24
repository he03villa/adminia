import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearcopropiedadRoutingModule } from './crearcopropiedad-routing.module';
import { CrearcopropiedadComponent } from './crearcopropiedad.component';


@NgModule({
  declarations: [CrearcopropiedadComponent],
  imports: [
    CommonModule,
    CrearcopropiedadRoutingModule
  ]
})
export class CrearcopropiedadModule { }
