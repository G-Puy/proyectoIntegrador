import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';
import { DialogUnProductoComponent } from '../DialogUnProducto/DialogUnProducto.component';

@Component({
  selector: 'app-dialogbuscador',
  templateUrl: './dialogbuscador.component.html',
  styleUrls: ['./dialogbuscador.component.css']
})
export class DialogbuscadorComponent {
  txtBuscar: string = "";
  todosLosProductos: recibirProductoDTOBack[] = [];
  productosFiltrados: recibirProductoDTOBack[] = [];
  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private funcionesGlobalesService: FuncionesGlobalesService,
    private sharedServ: SharedService,
  ) {
    this.todosLosProductos = this.sharedServ.obtenerProductosCargados();
  }
  vaciarTxtYBorrarBusqueda() {
    this.productosFiltrados = [];
    this.txtBuscar = "";
  }
  filtrar() {
    this.productosFiltrados = [];
    if (this.txtBuscar != "") {
      this.productosFiltrados = this.todosLosProductos.filter(elemento =>
        elemento.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase())
      );
    }
  }
  cargaSrc(producto: recibirProductoDTOBack) {
    return this.funcionesGlobalesService.cargarSrc(producto);
  }

  openUnProducto(producto: recibirProductoDTOBack) {
    const dialogRef = this.dialog.open(DialogUnProductoComponent, {
      // width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      width: '400px',
      data: { producto: producto },
      disableClose: false  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });
  }
}
