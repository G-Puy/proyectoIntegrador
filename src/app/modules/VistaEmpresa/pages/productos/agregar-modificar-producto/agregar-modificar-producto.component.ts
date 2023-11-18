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
  silderImages = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzhZqPrVZHyIsGx6Xn52PDFAKymzGC7LLeBA&usqp=CAU',
    'https://f.fcdn.app/imgs/c51350/sisi.com.uy/sisiuy/904b/original/catalogo/34609_001/440x600/colaless-tiritas-apricots-blanco.jpg'
    , 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6lF7f1nB2hkpj40Tw7jt1MNJnMm3aMQzxHw&usqp=CAU',
  ];


}

