import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilComponent } from './editar-perfil.component';

const routes: Routes = [{ path: '', component: EditarPerfilComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarPerfilRoutingModule { }
