import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { single, timestamp } from 'rxjs';
import { DTODataTodosLosProductos } from 'src/app/interfaces/DTODataTodosLosProductos.interface';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-todoslosproductos',
  templateUrl: './todoslosproductos.component.html',
  styleUrls: ['./todoslosproductos.component.css']
})
export class TodoslosproductosComponent implements OnInit {
  tipoPrenda: string = '';
  txtBuscar: string = "";
  cargaTiposDePrenda: DTOGenAbms[] = [];
  opcionBusqueda: string = "nombre";
  panelOpenState = false;
  productosFiltrados: recibirProductoDTOBack[] = [];
  todosLosProductos: recibirProductoDTOBack[] = [];
  objParaTodosLosProductos: DTODataTodosLosProductos | undefined;

  constructor(public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    //this.todosLosProductos = this.sharedServ.obtenerProductosCargados();
    this.cargarTP();
    this.objParaTodosLosProductos = this.sharedServ.obtenerDatosParaTodosLosProductos();

    console.log(this.objParaTodosLosProductos);
  }
  ngOnInit(): void {
    //this.soloSiVengoCargado();
    this.cargarTodasLosProductos();
  }

  private cargarTodasLosProductos() {
    this.todosLosProductos = [];
    this.sharedServ.traerTodosLosProductos().subscribe(data => {
      if (data) {
        this.todosLosProductos = data;
        /*  for (let index = 0; index < data.length; index++) {
           const element = data[index];
           this.todosLosProductos.push(element);
         } */
        console.log(this.objParaTodosLosProductos);
      }
      this.soloSiVengoCargado();
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }

  private soloSiVengoCargado() {

    if (this.objParaTodosLosProductos != undefined) {
      if (this.objParaTodosLosProductos.tipoDeFiltro == "tipo") {
        this.opcionBusqueda = 'tipo';
        //Partimos de la base que no existen 2 tipos de prenda con el mismo nombre
        this.tipoPrenda = this.objParaTodosLosProductos?.tipoProductoBuscado;
        this.filtrar();

      } else if (this.objParaTodosLosProductos.tipoDeFiltro == "nuevo") {
        this.opcionBusqueda = 'nuevo';
        console.log('ENTRO nuevo');
        this.filtrar();

      } else if (this.objParaTodosLosProductos.tipoDeFiltro == "oferta") {
        this.opcionBusqueda = 'oferta';
        console.log('ENTRO oferta');
        this.filtrar();

      }
    } else {
      this.productosFiltrados = this.todosLosProductos;
    }
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
      console.log(this.tipoPrenda);
      const resultadoFiltradoTipo = this.todosLosProductos.filter(elemento =>
        elemento.tipoProductoNombre.toLowerCase().includes(this.tipoPrenda.toLowerCase())
      );
      this.productosFiltrados = resultadoFiltradoTipo;
    } else if (this.opcionBusqueda == "oferta") {
      const resultadoFiltradoTipo = this.todosLosProductos.filter(elemento =>
        elemento.precioAnterior != -1
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
