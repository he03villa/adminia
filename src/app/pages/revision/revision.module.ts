import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevisionRoutingModule } from './revision-routing.module';
import { RevisionComponent } from './revision.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [RevisionComponent],
  imports: [
    CommonModule,
    RevisionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RevisionModule { }
