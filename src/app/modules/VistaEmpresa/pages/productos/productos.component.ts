import { Component } from '@angular/core';
import { AgregarModificarProductoComponent } from './agregar-modificar-producto/agregar-modificar-producto.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/shared.service';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { NgFor } from '@angular/common';
import { AceptarCancelarDialogComponent } from 'src/app/components/aceptar-cancelar-dialog/aceptar-cancelar-dialog.component';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { AddEditGenericoComponent } from 'src/app/components/add-edit-generico/add-edit-generico.component';
import { DTOProductoEnvio } from 'src/app/interfaces/DTOsEnvio/productoEnvioDTO.interface';
import { DTOImagen } from 'src/app/interfaces/DTOImagen.interface';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  todosLosProductos: recibirProductoDTOBack[] = [];
  todosLosProductosFiltrados: recibirProductoDTOBack[] = [];
  opcionBusqueda: string = "Nombre";
  parametroFiltradoNombre: string = "";
  parametroFiltradoId: number | null = null;
  panelOpenState = true;

  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    /*    this.todosLosProductos = {
         id: 0,
         nombre: '',
         descripcion: '',
         precioActual: 0,
         precioAnterior: 0,
         idTipoProducto: 0,
         visibleEnWeb: false,
         nuevo: false,
         bajaLogica: false,
         guiaTalles: '',
         stock: {
           id: -1,
           idProducto: -1,
           cantidadTotal: 0,
           talles: [],
           cargado: false,
         },
         imagenes: [], // Puedes poner aquí un array de DTOStock
         // Esto sería un array vacío o con objetos File según sea necesario
       };
    */



  }
  ngOnInit(): void {
    this.traerTodasLosProductos();
  }

  url = window.URL.createObjectURL(new Blob([], { type: 'image/png' }));
  openDialogAgregarEditar(agregar: boolean, productoEditar: DTOProductoEnvio | null) {

    const dialogRef = this.dialog.open(AgregarModificarProductoComponent, {
      width: '500px',
      data: { soyAgregar: agregar, productoEdit: productoEditar },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.error != "") {
        this.funcionesGlobalesService.abrirSnack(result.error, 2000, false);
      } else if (result.result == true) {
        this.funcionesGlobalesService.abrirSnack("Operación exitosa.", 2000, true);
        this.traerTodasLosProductos();
        setTimeout(() => {

          this.filtrar();
        }, 1200);
      }
    });
  }

  private traerTodasLosProductos() {
    this.todosLosProductos = [];
    this.sharedServ.traerTodosLosProductos().subscribe(data => {
      if (data) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.todosLosProductos.push(element);
        }
      }
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }
  public cargarSrc(producto: recibirProductoDTOBack): string {
    return `data:image/${producto.imagenes[0].extension};base64,${producto.imagenes[0].imagen}`;

  }
  vaciarInputs(tipoFiltrado: string) {
    if (tipoFiltrado == "Nombre") {
      this.parametroFiltradoId = null;
    } else {
      this.parametroFiltradoNombre = "";
    }
  }
  vaciarCampoFiltro(tipoFiltrado: string) {
    if (tipoFiltrado == "Nombre") {
      this.parametroFiltradoNombre = "";
    } else {
      this.parametroFiltradoId = null;
    }
  }
  filtrar() {
    this.todosLosProductosFiltrados = [];
    if (this.parametroFiltradoId != null || this.parametroFiltradoNombre != "") {
      switch (this.opcionBusqueda) {
        case 'Id':
          for (let index = 0; index < this.todosLosProductos.length; index++) {
            const productoActual = this.todosLosProductos[index];
            if (productoActual.id == this.parametroFiltradoId) {
              this.todosLosProductosFiltrados.push(productoActual);
            }
          }
          break;
        case 'Nombre':
          for (let index = 0; index < this.todosLosProductos.length; index++) {
            const productoActual = this.todosLosProductos[index];
            if (productoActual.nombre.toUpperCase().includes(this.parametroFiltradoNombre.toUpperCase())) {
              this.todosLosProductosFiltrados.push(productoActual);
            }
          }
          break;
      }
    } else {
      this.todosLosProductosFiltrados = this.todosLosProductos.slice();
    }
  }
  vaciarFiltros() {
    this.parametroFiltradoNombre = "";
    this.parametroFiltradoId = null;
    this.opcionBusqueda = "Nombre";
    this.filtrar();
  }
  openDialogEliminar(producto: recibirProductoDTOBack) {

    const dialogRef = this.dialog.open(AceptarCancelarDialogComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      data: { message: `¿Desea eliminar ${producto.nombre}?` },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminar(producto.id);
      }
    });
  }

  private eliminar(idProducto: number) {
    this.sharedServ.eliminarProducto(idProducto)
      .subscribe({
        next: (resultadoEliminar) => {
          if (resultadoEliminar) {
            this.funcionesGlobalesService.abrirSnack("El eliminado fue exitoso.", 2000, true);
            this.traerTodasLosProductos();
            setTimeout(() => {
              this.filtrar();
            }, 1000);
          }
          else {
            this.funcionesGlobalesService.abrirSnack("No se pudo eliminar", 2000, true);
          }
        },
        error: (error) => {
          this.funcionesGlobalesService.abrirSnack(error.error, 2000, true);
        }
      });
  }












}
