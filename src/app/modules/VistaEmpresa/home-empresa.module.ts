import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEmpresaComponent } from './pages/home-empresa/home-empresa.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarGlobalEmpresaComponent } from './nav-bar-global-empresa/nav-bar-global-empresa.component';
import { HomeEmpresaModuleRoutingModule } from './home-empresa-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { LayoutEmpresaComponent } from './pages/layout-empresa/layout-empresa.component';
import { AgregarModificarProductoComponent } from './pages/productos/agregar-modificar-producto/agregar-modificar-producto.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    HomeEmpresaComponent,
    NavBarGlobalEmpresaComponent,
    ProductosComponent,
    LayoutEmpresaComponent,
    AgregarModificarProductoComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeEmpresaModuleRoutingModule
  ],
  exports: [
    NavBarGlobalEmpresaComponent, HomeEmpresaComponent
  ]
})
export class HomeEmpresaModule { }
