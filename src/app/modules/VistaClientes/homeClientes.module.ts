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


@NgModule({
  declarations: [
    HomeClientesComponent,
    MenuComponent,
    NavBarGlobalComponent,
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
