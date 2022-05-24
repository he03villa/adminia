import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearcopropiedadComponent } from './crearcopropiedad.component';

const routes: Routes = [{ path: '', component: CrearcopropiedadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearcopropiedadRoutingModule { }
