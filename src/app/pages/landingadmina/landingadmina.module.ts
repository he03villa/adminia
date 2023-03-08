import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingadminaComponent } from './landingadmina.component';
import { LandingadminaRoutingModule } from './landingadmina-routing.module';



@NgModule({
  declarations: [LandingadminaComponent],
  imports: [
    CommonModule,
    LandingadminaRoutingModule
  ]
})
export class LandingadminaModule { }
