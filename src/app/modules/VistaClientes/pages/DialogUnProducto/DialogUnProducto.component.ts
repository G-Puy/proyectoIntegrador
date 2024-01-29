import { Overlay } from '@angular/cdk/overlay';
import { Component, EventEmitter, Inject, Input, Output, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { DTOImagen } from 'src/app/interfaces/DTOImagen.interface';
import { objCarritoYProcesoDeCompra } from 'src/app/interfaces/DTOsCarritoYProcesoDeCompra/DTOCarritoYProcesoDeCompra.interface';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-dialogmenu',
  templateUrl: './DialogUnProducto.component.html',
  styleUrls: ['./DialogUnProducto.component.css']
})
export class DialogUnProductoComponent implements OnInit {
  objetoProducto: recibirProductoDTOBack | undefined;
  objProductoParaElCarrito: objCarritoYProcesoDeCompra | undefined;
  seleccionTalle: DTOGenAbms | undefined;
  seleccionColor: DTOGenAbms | undefined;
  cargaTalles: DTOGenAbms[] = [];
  cargaColores: DTOGenAbms[] = [];
  private cantidadSubject = new Subject<number>();
  cantidad$ = this.cantidadSubject.asObservable();
  public cantidad: number = 1;

  constructor(
    private sharedServ: SharedService,
    public dialogRef: MatDialogRef<DialogUnProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    this.objetoProducto = data.producto;
    for (let index = 0; index < this.data.producto.imagenes.length; index++) {
      const element = this.data.producto.imagenes[index];
      this.silderImages.push(this.cargarSrc(element));
    }
  }
  ngOnInit(): void {
    this.cargarTallesYColoresDelProducto();
    this.cantidad$.subscribe(value => {
      this.validarNumero(value);
    });
  }
  actualizarCantidad(nuevaCantidad: number): void {
    this.cantidadSubject.next(nuevaCantidad); // Esto emitirá el nuevo valor
  }
  validarNumero(value: number): void {
    console.log('Validar numero llamado con:', value);
    if (value == null) {
      this.cantidad = 1;
    } else if (value < 1) {
      this.cantidad = 1;
    } else if (value > 20) {
      this.cantidad = 20;
    }
  }



  private cargarTallesYColoresDelProducto() {
    if (this.objetoProducto?.stock.cantidad! > 0) {
      this.objetoProducto?.stock.talles.forEach(talleActual => {
        if (talleActual.cantidad > 0) {
          let nuevoTalle: DTOGenAbms = {
            id: talleActual.id,
            nombre: talleActual.nombreTalle,
            bajaLogica: false
          };
          this.cargaTalles.push(nuevoTalle);
        }
      });

      if (this.cargaTalles.length > 0) {

        for (let index = 0; index < this.objetoProducto!.stock.talles[0].colores.length; index++) {
          const colorActual = this.objetoProducto!.stock.talles[0].colores[index];
          const nuevoColor: DTOGenAbms = {
            id: colorActual.id,
            nombre: colorActual.nombreColor,
            bajaLogica: false
          };
          this.cargaColores.push(nuevoColor);
        }
      }
    }

  }



  public cargarSrc(img: DTOImagen): string {
    return `data:image/${img.extension};base64,${img.imagen}`;
  }
  public darSrcProducto(): string {
    return `data:image/${this.objetoProducto!.imagenes[0].extension};base64,${this.objetoProducto!.imagenes[0].imagen}`;
  }
  silderImages: string[] = [];
  iteradorImg: number = 0;
  iterarIzquierda() {
    if (this.iteradorImg == 0) {
      this.iteradorImg = this.silderImages.length - 1;
    } else {
      this.iteradorImg--;
    }
  }
  iterarDerecha() {
    if (this.iteradorImg + 1 == this.silderImages.length) {
      this.iteradorImg = 0;
    }
    else {
      this.iteradorImg++;
    }
  }





  agregarAlCarrito() {
    if (this.seleccionTalle != undefined && this.seleccionColor != undefined && this.cantidad > 0) {
      this.objProductoParaElCarrito = {
        idProducto: this.objetoProducto!.id,
        nombreProducto: this.objetoProducto!.nombre,
        precio: this.objetoProducto?.precioActual!,
        oferta: false,
        imagen: this.objetoProducto?.imagenes[0]!,
        idStock: this.objetoProducto?.stock.id!,
        talle: this.seleccionTalle!,
        color: this.seleccionColor!,
        cantidad: this.cantidad
      }
      if (this.objetoProducto?.precioAnterior! > 0) {
        this.objProductoParaElCarrito.oferta = true;
      }
      if (!this.sharedServ.existeProductoEnCarrito(this.objProductoParaElCarrito)) {

        this.sharedServ.agregarProducto(this.objProductoParaElCarrito!);
        this.funcionesGlobalesService.abrirSnack('El producto fue agregado correctamente al carrito', 2000, true);
        this.dialogRef.close();
      } else {
        this.funcionesGlobalesService.abrirSnack('Ya existe el producto en el carrito', 2000, false);
      }
    } else {
      this.funcionesGlobalesService.abrirSnack('Verifique talle, color y cantidad', 2000, false);

    }
  }
}
