import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../components/components.module';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [PagosComponent],
  imports: [
    CommonModule,
    PagosRoutingModule,
    FormsModule,
    ComponentsModule,
    MatExpansionModule,
    ReactiveFormsModule
  ]
})
export class PagosModule { }
