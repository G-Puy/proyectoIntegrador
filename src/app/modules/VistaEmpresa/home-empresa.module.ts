import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ColorComponent } from './pages/colores/color.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { EditarstockComponent } from './pages/stocks/editarstock/editarstock.component';
import { BandejastockComponent } from './pages/bandejastock/bandejastock.component';
import { BandejaventasComponent } from './pages/bandejaventas/bandejaventas.component';
import { ColaboradoresComponent } from './pages/colaboradores/colaboradores.component';
import { PerfilPersonaComponent } from './pages/perfil-persona/perfil-persona.component';
import { DialogdetalleventaComponent } from './pages/bandejaventas/dialogdetalleventa/dialogdetalleventa.component';
import { AgregareditarcolaboradoresComponent } from './pages/colaboradores/agregareditarcolaboradores/agregareditarcolaboradores.component';
import { CambioContrasniaComponent } from './pages/perfil-persona/cambioContrasenia/cambio-contrasnia.component';
import { VerdetallestockComponent } from './pages/stocks/verdetallestock/verdetallestock.component';



@NgModule({
  declarations: [
    HomeEmpresaComponent,
    NavBarGlobalEmpresaComponent,
    ProductosComponent,
    LayoutEmpresaComponent,
    AgregarModificarProductoComponent,
    TallesComponent,
    TipoProductoComponent,
    ColorComponent,
    StocksComponent,
    EditarstockComponent,
    BandejastockComponent,
    BandejaventasComponent,
    ColaboradoresComponent,
    PerfilPersonaComponent,
    DialogdetalleventaComponent,
    AgregareditarcolaboradoresComponent,
    CambioContrasniaComponent,
    VerdetallestockComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeEmpresaModule { }
