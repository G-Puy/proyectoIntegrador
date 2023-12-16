import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOProductoEnvio } from 'src/app/interfaces/DTOsEnvio/productoEnvioDTO.interface';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DialogUnProductoComponent } from 'src/app/modules/VistaClientes/pages/DialogUnProducto/DialogUnProducto.component';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-card-producto',
  templateUrl: './card-producto.component.html',
  styleUrls: ['./card-producto.component.css']
})
export class CardProductoComponent {
  @Input() objetoProducto: recibirProductoDTOBack | undefined;

  constructor(
    private overlay: Overlay,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService) {
  }
  public darSrcProducto(): string {
    return `data:image/${this.objetoProducto!.imagenes[0].extension};base64,${this.objetoProducto!.imagenes[0].imagen}`;

  }

  openUnProducto() {
    const dialogRef = this.dialog.open(DialogUnProductoComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      data: { producto: this.objetoProducto, },
      disableClose: false  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });
  }
}
