import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MenuComponent } from './Menu/menu.component';
import { NavBarGlobalComponent } from './NavBarGlobal/nav-bar-global.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    NavBarGlobalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
