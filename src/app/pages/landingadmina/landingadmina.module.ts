import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingadminaComponent } from './landingadmina.component';
import { LandingadminaRoutingModule } from './landingadmina-routing.module';
import { ComponentsModule } from '../../components/components.module';



@NgModule({
  declarations: [LandingadminaComponent],
  imports: [
    CommonModule,
    LandingadminaRoutingModule,
    ComponentsModule
  ]
})
export class LandingadminaModule { }
