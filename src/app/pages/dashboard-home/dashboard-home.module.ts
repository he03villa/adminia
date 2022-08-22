import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { DashboardHomeRoutingModule } from './dashboard-home-routing.module';
import { DashboardHomeComponent } from './dashboard-home.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    DashboardHomeRoutingModule
  ]
})
export class DashboardHomeModule { }
