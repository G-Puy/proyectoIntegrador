import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEmpresaComponent } from './pages/home-empresa/home-empresa.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarGlobalEmpresaComponent } from './nav-bar-global-empresa/nav-bar-global-empresa.component';
import { HomeEmpresaModuleRoutingModule } from './home-empresa-routing.module';
import { ProductosComponent } from './pages/productos/productos.component';
import { LayoutEmpresaComponent } from './pages/layout-empresa/layout-empresa.component';
import { AgregarModificarProductoComponent } from './pages/productos/agregar-modificar-producto/agregar-modificar-producto.component';
import { TallesComponent } from './pages/talles/talles.component';
import { TipoProductoComponent } from './pages/tipo-producto/tipo-producto.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    HomeEmpresaComponent,
    NavBarGlobalEmpresaComponent,
    ProductosComponent,
    LayoutEmpresaComponent,
    AgregarModificarProductoComponent,
    TallesComponent,
    TipoProductoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeEmpresaModuleRoutingModule,
    ComponentsModule
  ],
  exports: [
    NavBarGlobalEmpresaComponent,
    HomeEmpresaComponent
  ]
})
export class HomeEmpresaModule { }
