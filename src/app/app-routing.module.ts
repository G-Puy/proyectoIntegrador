import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { PublicGuard } from './modules/auth/guards/public.guard';
//import { HomeEmpresaModule } from './modules/VistaEmpresa/home-empresa.module';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule),
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
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
  { path: '', redirectTo: '/store', pathMatch: 'full' }, // Ruta predeterminada
  { path: '**', redirectTo: '/store' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
