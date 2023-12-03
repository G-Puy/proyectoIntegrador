import { Component } from '@angular/core';
import { AgregarModificarProductoComponent } from './agregar-modificar-producto/agregar-modificar-producto.component';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SharedService } from 'src/app/shared/shared.service';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { NgFor } from '@angular/common';
import { AceptarCancelarDialogComponent } from 'src/app/components/aceptar-cancelar-dialog/aceptar-cancelar-dialog.component';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {

  todosLosProductos: recibirProductoDTOBack[] = [];

  constructor(
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private sharedServ: SharedService,
    private funcionesGlobalesService: FuncionesGlobalesService,) {
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
    //this.openDialogAgregarEditar();
    this.traerTodasLosProductos();

  }

  url = window.URL.createObjectURL(new Blob([], { type: 'image/png' }));
  openDialogAgregarEditar(agregar: boolean) {

    const dialogRef = this.dialog.open(AgregarModificarProductoComponent, {
      width: '300px',
      data: { soyAgregar: agregar },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.error != "") {
        this.funcionesGlobalesService.abrirSnack(result.error, 3000, false);
      } else if (result.result == true) {
        console.log("hay error");
        this.funcionesGlobalesService.abrirSnack("Operación exitosa.", 3000, true);
        this.traerTodasLosProductos();
      }
    });
  }

  private traerTodasLosProductos() {
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
    return `data:image/${producto.imagenes[0].nomExtensionbre};base64,${producto.imagenes[0].imagen}`;
  }

  imageSrc: string = "";
  //imageSrc: SafeUrl | null = null;
  loadImage() {
    this.sharedServ.getImage(12).subscribe(base64Image => {
      this.imageSrc = `data:image/png;base64,${base64Image}`;
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }

  eliminarProducto(producto: recibirProductoDTOBack) {

  }
  openDialogCancelar(producto: recibirProductoDTOBack) {

    const dialogRef = this.dialog.open(AceptarCancelarDialogComponent, {
      width: '300px',
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
    this.sharedServ.eliminarTipoPrenda(idProducto)
      .subscribe({
        next: (resultadoEliminar) => {
          if (resultadoEliminar) {
            this.funcionesGlobalesService.abrirSnack("El eliminado fue exitoso.", 3000, true);
            this.traerTodasLosProductos();
          }
          else {
            this.funcionesGlobalesService.abrirSnack("No se pudo eliminar", 3000, true);
          }
        },
        error: (error) => {
        }
      });
  }
}
