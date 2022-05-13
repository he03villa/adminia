import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopropiedadesComponent } from './copropiedades.component';

const routes: Routes = [{ path: '', component: CopropiedadesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopropiedadesRoutingModule { }
