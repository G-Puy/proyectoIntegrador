import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargarFotoComponent } from './cargar-foto/cargar-foto.component';


//CREO QUE SE TIENEN QUE IMPORTAR EN EL SHARED A FUTURO
import { FormsModule } from '@angular/forms';
import { CardProductoComponent } from 'src/app/components/CardProducto/card-producto.component';



@NgModule({
  declarations: [
    CargarFotoComponent,
    CardProductoComponent

  ],
  imports: [
    CommonModule,
    FormsModule

  ],
  exports: [
    CargarFotoComponent
  ]
})
export class CargarFotoModule { }
