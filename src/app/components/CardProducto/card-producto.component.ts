import { Component, Input } from '@angular/core';
import { DTOProductoEnvio } from 'src/app/interfaces/DTOsEnvio/productoEnvioDTO.interface';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css']
})
export class CardProductoComponent {
  @Input() objetoProducto: recibirProductoDTOBack | undefined;

  public darSrcProducto(): string {
    return `data:image/${this.objetoProducto!.imagenes[0].extension};base64,${this.objetoProducto!.imagenes[0].imagen}`;

  }
}
