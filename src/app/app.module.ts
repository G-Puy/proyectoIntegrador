import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CargarFotoModule } from './modules/cargar-foto/cargar-foto.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { HomeModuleClientes } from './modules/VistaClientes/homeClientes.module';
import { HomeEmpresaModule } from './modules/VistaEmpresa/home-empresa.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CargarFotoModule,
    HttpClientModule,
    HomeModuleClientes,
    HomeEmpresaModule,
    RouterModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// hola mundo
