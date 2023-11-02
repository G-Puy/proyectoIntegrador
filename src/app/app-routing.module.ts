import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
//import { HomeEmpresaModule } from './modules/VistaEmpresa/home-empresa.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'lEmpresa',
    loadChildren: () => import('./modules/VistaEmpresa/home-empresa.module').then(m => m.HomeEmpresaModule),
    canActivate: [AuthGuard],
    canMatch: [AuthGuard]
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/VistaClientes/homeClientes.module').then(m => m.HomeModuleClientes),

  },
  { path: '', redirectTo: '/lEmpresa', pathMatch: 'full' }, // Ruta predeterminada
  { path: '**', redirectTo: '/lEmpresa' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
