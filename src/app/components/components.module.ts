import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [NavComponent],
  exports: [NavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    ClipboardModule,
  ]
})
export class ComponentsModule { }
