import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialRevisionesComponent } from './historial-revisiones.component';

const routes: Routes = [{ path: '', component: HistorialRevisionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRevisionesRoutingModule { }
