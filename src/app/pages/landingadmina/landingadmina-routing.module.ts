import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingadminaComponent } from './landingadmina.component';

const routes: Routes = [{ path: '', component: LandingadminaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingadminaRoutingModule { }
