import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './Menu/menu.component';
import { NavBarGlobalComponent } from './NavBarGlobal/nav-bar-global.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayRef, OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';

import { HomeClientesComponent } from './pages/home-cliente/home.component';
import { HomeClienteModuleRoutingModule } from './home-Cliente-routing.module';
import { LayoutClientesComponent } from './pages/layout-clientes/layout-clientes.component';
import { CardProductoComponent } from 'src/app/components/CardProducto/card-producto.component';
import { DialogUnProductoComponent } from './pages/DialogUnProducto/DialogUnProducto.component';
import { TodoslosproductosComponent } from './pages/todoslosproductos/todoslosproductos.component';
import { DialogCarritoComponent } from './pages/carrito/dialog-carrito/dialog-carrito.component';
import { PagosComponent } from './pages/pagos/pagos.component';
import { SuccessComponent } from './pages/pagos/paginasredireccionpagos/success/success.component';
import { FailureComponent } from './pages/pagos/paginasredireccionpagos/failure/failure.component';
import { PendingComponent } from './pages/pagos/paginasredireccionpagos/pending/pending.component';


@NgModule({
  declarations: [
    HomeClientesComponent,
    MenuComponent,
    NavBarGlobalComponent,
    LayoutClientesComponent,
    CardProductoComponent,
    DialogUnProductoComponent,
    TodoslosproductosComponent,
    DialogCarritoComponent,
    PagosComponent,
    SuccessComponent,
    FailureComponent,
    PendingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalModule,
    MatDialogModule,
    OverlayModule,
    HomeClienteModuleRoutingModule

  ],
  exports: [
    HomeClientesComponent,
  ],
  providers: [],


})
export class HomeModuleClientes { }
