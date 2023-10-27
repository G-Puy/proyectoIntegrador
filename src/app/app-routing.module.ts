import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { HomeEmpresaModule } from './modules/VistaEmpresa/home-empresa.module';

const routes: Routes = [

  {
    path: 'lEmpresa',
    loadChildren: () => import('./modules/VistaEmpresa/home-empresa.module').then(m => m.HomeEmpresaModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/VistaClientes/homeClientes.module').then(m => m.HomeModuleClientes)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta predeterminada
  { path: '**', redirectTo: '/store' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
