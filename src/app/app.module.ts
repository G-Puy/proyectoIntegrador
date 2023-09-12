import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CargarFotoModule } from './modules/cargar-foto/cargar-foto.module';
import { CardProductoComponent } from './components/CardProducto/card-producto.component';
import { NavBarGlobalComponent } from './components/NavBarGlobal/nav-bar-global.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarGlobalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CargarFotoModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
