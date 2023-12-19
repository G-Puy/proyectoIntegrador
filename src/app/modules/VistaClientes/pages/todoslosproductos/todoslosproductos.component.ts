import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-todoslosproductos',
  templateUrl: './todoslosproductos.component.html',
  styleUrls: ['./todoslosproductos.component.css']
})
export class TodoslosproductosComponent {
  cargaTiposDePrenda: DTOGenAbms[] = [];
  opcionBusqueda: string = "Nombre";
  panelOpenState = false;
  productosFiltrados: recibirProductoDTOBack[] = [];
  todosLosProductos: recibirProductoDTOBack[] = [];
  constructor(public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    this.sharedServ.cargarTodasLosProductos();
    this.todosLosProductos = this.sharedServ.obtenerProductosCargados();
    //this.traerTodasLosProductos();
  }
  vaciarTxtYBorrarBusqueda() {
    this.productosFiltrados = [];

  }
  filtrar() {
    this.productosFiltrados = [];
    console.log(this.todosLosProductos);
    /* if (this.txtBuscar != "") {
      this.productosFiltrados = this.todosLosProductos.filter(elemento =>
        elemento.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase())
      );
    } */
  }
}
