import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrearcopropiedadRoutingModule } from './crearcopropiedad-routing.module';
import { CrearcopropiedadComponent } from './crearcopropiedad.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CrearcopropiedadComponent],
  imports: [
    CommonModule,
    CrearcopropiedadRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CrearcopropiedadModule { }
