import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarPerfilRoutingModule } from './editar-perfil-routing.module';
import { EditarPerfilComponent } from './editar-perfil.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EditarPerfilComponent],
  imports: [
    CommonModule,
    EditarPerfilRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EditarPerfilModule { }
