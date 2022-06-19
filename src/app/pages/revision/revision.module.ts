import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevisionRoutingModule } from './revision-routing.module';
import { RevisionComponent } from './revision.component';


@NgModule({
  declarations: [RevisionComponent],
  imports: [
    CommonModule,
    RevisionRoutingModule
  ]
})
export class RevisionModule { }
