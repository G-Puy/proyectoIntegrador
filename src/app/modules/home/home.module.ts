import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MenuComponent } from './Menu/menu.component';
import { NavBarGlobalComponent } from './NavBarGlobal/nav-bar-global.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayRef, OverlayModule, OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    NavBarGlobalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortalModule,
    MatDialogModule, OverlayModule

  ],
  exports: [
    HomeComponent,
  ],
  providers: [],


})
export class HomeModule { }
