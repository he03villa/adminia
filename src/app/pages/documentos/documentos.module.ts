import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentosRoutingModule } from './documentos-routing.module';
import { DocumentosComponent } from './documentos.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [DocumentosComponent],
  imports: [
    CommonModule,
    DocumentosRoutingModule,
    ComponentsModule
  ]
})
export class DocumentosModule { }
