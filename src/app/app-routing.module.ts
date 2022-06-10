import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './pages/content/content.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/dashboard-home/dashboard-home.module').then(m => m.DashboardHomeModule) },
      { path: 'copropiedades', loadChildren: () => import('./pages/copropiedades/copropiedades.module').then(m => m.CopropiedadesModule) },
      { path: 'pagos', loadChildren: () => import('./pages/pagos/pagos.module').then(m => m.PagosModule) },
      { path: 'buzon', loadChildren: () => import('./pages/buzon/buzon.module').then(m => m.BuzonModule) },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },
  {
    path: '',
    component: ContentComponent,
    children: [
      { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
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
