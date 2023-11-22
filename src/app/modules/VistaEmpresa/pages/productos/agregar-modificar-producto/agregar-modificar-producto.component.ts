import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { DTOStock } from 'src/app/interfaces/stockDTO.interface';
import { SharedService } from 'src/app/shared/shared.service';
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
  precio: number = -1;
  idTipo: number = -1;
  enviarStock: DTOStock[] = [];
  opcion: string = "ninguna";
  precioAnterior: number = -1;
  txtAreaDescripcion: string = "";
  txtAreaGuiaTalles: string = "";

  mostrarOpcion() {
    console.log(this.opcion);
  }

  cargaTiposDePrenda: DTOGenAbms[] = [];
  cargaTalles: DTOGenAbms[] = [];
  cargaColores: DTOGenAbms[] = [];
  constructor(private sharedServ: SharedService) {
    /* this.sharedServ.getAllTalles().subscribe(talles => {
      this.cargaTalles = talles;
      console.log(talles);
    });
    this.sharedServ.getAllColores().subscribe(colores => {
      this.cargaColores = colores;
      console.log(colores);
    });
    this.sharedServ.getAllTipoPrendas().subscribe(tp => {
      this.cargaTiposDePrenda = tp;
      console.log(tp);
    }); */

  }
  ngOnInit(): void {
  }




  ngAfterViewInit() {


  }

  //#region  Slider / elegir archivos img
  //#endregion
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


  //#region  seleccionesMultiples
  actualizarSeleccion(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    //this.seleccionadasTipoPRenda = Array.from(selectElement.selectedOptions).map(o => o.value);
  }
  //#endregion

}