import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CargarFotoModule } from './modules/cargar-foto/cargar-foto.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { HomeModuleClientes } from './modules/VistaClientes/homeClientes.module';
import { HomeEmpresaModule } from './modules/VistaEmpresa/home-empresa.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './modules/auth/interceptor/auth.interceptor';

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
    RouterModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


// hola mundo
