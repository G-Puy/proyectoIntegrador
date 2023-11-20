import { AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();


@Component({
  selector: 'app-agregar-modificar-producto',
  templateUrl: './agregar-modificar-producto.component.html',
  styleUrls: ['./agregar-modificar-producto.component.css']
})
export class AgregarModificarProductoComponent implements AfterViewInit {

  ngAfterViewInit() {
    new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
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

  onFileChange(event: Event) {
    // Vaciamos el arreglo para nuevos archivos
    this.silderImages = [];

    // Casting del evento para acceder a los archivos
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length) {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        // Asegurarse de que el tipo del evento onLoad sea correcto
        reader.onload = (e: ProgressEvent<FileReader>) => {
          // Verificar que result no sea null
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