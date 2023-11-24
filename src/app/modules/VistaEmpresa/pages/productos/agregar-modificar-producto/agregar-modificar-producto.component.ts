import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { DTOStock } from 'src/app/interfaces/stockDTO.interface';
import { SharedService } from 'src/app/shared/shared.service';
import { DTOProducto } from 'src/app/interfaces/productoDTO.interface';
// register Swiper custom elements
register();


@Component({
  selector: 'app-agregar-modificar-producto',
  templateUrl: './agregar-modificar-producto.component.html',
  styleUrls: ['./agregar-modificar-producto.component.css']
})
export class AgregarModificarProductoComponent implements AfterViewInit {
  archivosSeleccionados: FileList | null = null;
  txtNombre: string = "";
  precio = null;
  idTipo: number = -1;
  enviarStock: DTOStock[] = [];
  opcion: string = "ninguna";
  precioOferta = 0;
  txtAreaDescripcion: string = "";
  txtAreaGuiaTalles: string = "";
  visibleEnWeb: boolean = true;
  productoEnviar: DTOProducto = {
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
    stocks: [], // Puedes poner aquí un array de DTOStock
    imagenes: [] // Esto sería un array vacío o con objetos File según sea necesario
  };

  seleccionTalles: DTOGenAbms[] = [];
  seleccionColores: DTOGenAbms[] = [];
  cargaTiposDePrenda: DTOGenAbms[] = [];
  cargaTalles: DTOGenAbms[] = [];
  cargaColores: DTOGenAbms[] = [];
  mostrarOpcion() {
    this.validarCamposOBj();

  }
  constructor(private sharedServ: SharedService) {

    this.sharedServ.getAllTalles().subscribe(talles => {
      this.cargaTalles = talles;
    });
    this.sharedServ.getAllColores().subscribe(colores => {
      this.cargaColores = colores;
    });
    this.sharedServ.getAllTipoPrendas().subscribe(tp => {
      this.cargaTiposDePrenda = tp;
    });

  }

  //#region  IMAGENES
  ngOnInit(): void {
  }
  ngAfterViewInit() {


  }

  iteradorImg: number = 0;
  iterarIzquierda() {
    if (this.iteradorImg == 0) {
      this.iteradorImg = this.silderImages.length - 1;
    } else {
      this.iteradorImg--;
    }
  }
  iterarDerecha() {
    console.log(this.iteradorImg);
    if (this.iteradorImg + 1 == this.silderImages.length) {
      this.iteradorImg = 0;
    }
    else {
      this.iteradorImg++;
    }
  }
  silderImages: string[] = [];
  fileError: string = "";
  onFileChange(event: Event) {
    // Vaciamos el arreglo para nuevos archivos
    this.silderImages = [];
    this.fileError = "";
    // Casting del evento para acceder a los archivos
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.archivosSeleccionados = input.files;
    }



    if (input.files && input.files.length) {
      // Validación del número máximo de archivos
      if (input.files.length > 3) {
        this.fileError = "Solo puedes subir un máximo de 3 imágenes.";
        setTimeout(() => {
          this.fileError = "";
          input.value = ''; // Vaciando el input después del mensaje de error
        }, 2000);
        this.silderImages = [];
        return;
      }

      const validFormats = ['image/jpeg', 'image/png'];
      const files = Array.from(input.files);

      // Verificar los formatos de los archivos
      const allValid = files.every(file => validFormats.includes(file.type));
      if (!allValid) {
        this.fileError = "Solo se permiten archivos JPG, JPEG y PNG.";
        setTimeout(() => {
          this.fileError = "";
          input.value = ''; // Vaciando el input después del mensaje de error
        }, 2000);
        this.silderImages = [];
        return;
      }

      // Procesamiento de los archivos
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.silderImages.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
  //#endregion IMAGENES
  //#regio OBJ PARA ENVIAR
  errorValidacion = "";

  public enviarObj() {

  }
  private validarCamposOBj() {
    if (this.archivosSeleccionados == null || this.archivosSeleccionados!?.length <= 0) {
      this.errorValidacion = "Debe subir almenos 1 imagen.";
      setTimeout(() => {
        this.errorValidacion = "";
      }, 4000);

    } else if (
      this.txtNombre == '' ||
      (this.precio == null || this.precio <= 0) ||
      this.idTipo == -1 ||
      this.seleccionTalles.length <= 0 ||
      this.seleccionColores.length <= 0 ||
      (this.precioOferta == null && this.opcion == 'oferta')
    ) {
      this.errorValidacion = "Los campos en rojo son obligatorios.";
      setTimeout(() => {
        this.errorValidacion = "";
      }, 4000);
    } else {
      //*CARGA FOTOS
      for (let index = 0; index < this.archivosSeleccionados!.length; index++) {
        const element = this.archivosSeleccionados![index];
        this.productoEnviar.imagenes.push(element);
      }
      //*CARGA NOMBRE
      this.productoEnviar.nombre = this.txtNombre;
      //*CARGA PRECIO
      this.productoEnviar.precioActual = this.precio;
      //*CARGA TIPO
      this.productoEnviar.idTipoProducto = this.idTipo;
      //*CARGA OPCION
      if (this.opcion == "oferta") { this.productoEnviar.precioAnterior = this.precioOferta; } else { this.productoEnviar.precioAnterior = -1; }
      if (this.opcion == "nuevo") { this.productoEnviar.nuevo = true; } else { this.productoEnviar.nuevo = false; }
      //*CARGA VISIBLE EN WEB
      this.productoEnviar.visibleEnWeb = this.visibleEnWeb;
      //*CARGA DESCRIPCION
      this.productoEnviar.descripcion = this.txtAreaDescripcion;
      //*CARGA GUIA DE TALLES
      this.productoEnviar.guiaTalles = this.txtAreaGuiaTalles;
      //*CARGA STOCKS
      for (let index = 0; index < this.seleccionTalles!.length; index++) {
        const talleActual = this.seleccionTalles![index];
        let unStock: DTOStock = {
          idProducto: -1,
          idColor: -1,
          idTalle: talleActual.id,
          cantidad: 0,
          id: -1
        }
        for (let i = 0; i < this.seleccionColores.length; i++) {
          const colorActual = this.seleccionColores[i];
          unStock.idColor = colorActual.id;
        }
        this.productoEnviar.stocks.push(unStock);
      }
      console.log(this.productoEnviar);
    }
  }




  //#endregion PARA ENVIAR


}