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
  tipoPrenda: string = '';
  txtBuscar: string = "";
  cargaTiposDePrenda: DTOGenAbms[] = [];
  opcionBusqueda: string = "nombre";
  panelOpenState = false;
  productosFiltrados: recibirProductoDTOBack[] = [];
  todosLosProductos: recibirProductoDTOBack[] = [];
  constructor(public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    this.sharedServ.cargarTodasLosProductos();
    this.todosLosProductos = this.sharedServ.obtenerProductosCargados();
    this.productosFiltrados = this.todosLosProductos;
    this.cargarTP();
    //this.traerTodasLosProductos();
  }
  vaciarTxtYBorrarBusqueda() {
    // this.productosFiltrados = [];
    this.txtBuscar = "";
  }
  filtrar() {
    this.productosFiltrados = [];
    if (this.opcionBusqueda == "nombre") {
      if (this.txtBuscar != "") {
        this.productosFiltrados = this.todosLosProductos.filter(elemento =>
          elemento.nombre.toLowerCase().includes(this.txtBuscar.toLowerCase())
        );
      } else {
        this.productosFiltrados = this.todosLosProductos;
      }
    } else if (this.opcionBusqueda == "tipo") {
      const resultadoFiltradoTipo = this.todosLosProductos.filter(elemento =>
        elemento.tipoProductoNombre.toLowerCase().includes(this.tipoPrenda.toLowerCase())
      );
      this.productosFiltrados = resultadoFiltradoTipo;
    } else if (this.opcionBusqueda == "oferta") {
      const resultadoFiltradoTipo = this.todosLosProductos.filter(elemento =>
        elemento.precioAnterior > 0
      );
      this.productosFiltrados = resultadoFiltradoTipo;
    } else if (this.opcionBusqueda == "nuevo") {
      const resultadoFiltradoTipo = this.todosLosProductos.filter(elemento =>
        elemento.nuevo == true
      );
      this.productosFiltrados = resultadoFiltradoTipo;
    }
  }

  eliminarFiltros() {
    this.productosFiltrados = this.todosLosProductos;
  }


  //#region CARGA SELECT TIPO PRODUCTO
  private cargarTP() {
    this.sharedServ.getAllTipoPrendas().subscribe(tp => {
      this.cargaTiposDePrenda = tp;
    });

  }
  //#endregion
}
