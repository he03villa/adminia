import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RevisionComponent } from './revision.component';

const routes: Routes = [{ path: '', component: RevisionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionRoutingModule { }
