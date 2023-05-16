import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClipboardModule } from 'ngx-clipboard';
import { ModalCrearRevisionComponent } from './modal-crear-revision/modal-crear-revision.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoDataComponent } from './no-data/no-data.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalVerInfoPropietarioComponent } from './modal-ver-info-propietario/modal-ver-info-propietario.component';
import { ModalNotificacionComponent } from './modal-notificacion/modal-notificacion.component';
import { ModalCambiarPasswordComponent } from './modal-cambiar-password/modal-cambiar-password.component';
import { FooterComponent } from './footer/footer.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';



@NgModule({
  declarations: [
    NavComponent, 
    ModalCrearRevisionComponent, 
    NoDataComponent, 
    ModalVerInfoPropietarioComponent, 
    ModalNotificacionComponent, 
    ModalCambiarPasswordComponent,
    FooterComponent,
    ModalLoginComponent
  ],
  exports: [
    NavComponent, 
    ModalCrearRevisionComponent, 
    NoDataComponent, 
    ModalVerInfoPropietarioComponent, 
    ModalCambiarPasswordComponent,
    FooterComponent,
    ModalLoginComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatMenuModule,
    MatExpansionModule,
    ClipboardModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class ComponentsModule { }
