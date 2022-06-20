import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { ClipboardModule } from 'ngx-clipboard';
import { ModalCrearRevisionComponent } from './modal-crear-revision/modal-crear-revision.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavComponent, ModalCrearRevisionComponent],
  exports: [NavComponent, ModalCrearRevisionComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ComponentsModule { }
