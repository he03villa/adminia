import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { AutPropiedadService } from './services/aut-propiedad.service';
import { NoAuthService } from './services/no-auth.service';
import { ActivarUserService } from './services/activar-user.service';
import { ActivarPropiedadService } from './services/activar-propiedad.service';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService],
    children: [
      { path: '', loadChildren: () => import('./pages/dashboard-home/dashboard-home.module').then(m => m.DashboardHomeModule) },
      { path: 'copropiedades', loadChildren: () => import('./pages/copropiedades/copropiedades.module').then(m => m.CopropiedadesModule) },
      { path: 'pagos', loadChildren: () => import('./pages/pagos/pagos.module').then(m => m.PagosModule) },
      { path: 'buzon', loadChildren: () => import('./pages/buzon/buzon.module').then(m => m.BuzonModule) },
      { path: 'propietarios', loadChildren: () => import('./pages/propietarios/propietarios.module').then(m => m.PropietariosModule) },
      { path: 'documento', loadChildren: () => import('./pages/documentos/documentos.module').then(m => m.DocumentosModule) },
      { path: 'revision', loadChildren: () => import('./pages/revision/revision.module').then(m => m.RevisionModule) },
      { path: 'editar-perfil', loadChildren: () => import('./pages/editar-perfil/editar-perfil.module').then(m => m.EditarPerfilModule) },
      { path: 'historial-reviciones', loadChildren: () => import('./pages/historial-revisiones/historial-revisiones.module').then(m => m.HistorialRevisionesModule) },
      { path: '**', redirectTo: 'copropiedades' },
    ]
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [NoAuthService],
    children: [
      { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [ActivarUserService, ActivarPropiedadService] },
      { path: 'registro-propiedad', loadChildren: () => import('./pages/crearcopropiedad/crearcopropiedad.module').then(m => m.CrearcopropiedadModule) },
      { path: '**', redirectTo: 'login' }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
