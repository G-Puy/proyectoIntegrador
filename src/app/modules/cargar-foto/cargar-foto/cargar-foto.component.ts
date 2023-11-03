import { Component, ElementRef, ViewChild } from '@angular/core';
import { CargarFotoServiceService } from '../cargar-foto-service.service';


@Component({
  selector: 'app-cargar-foto',
  templateUrl: './cargar-foto.component.html',
  styleUrls: ['./cargar-foto.component.css']
})
export class CargarFotoComponent {

  constructor(private ServicioFoto: CargarFotoServiceService) {

  }

  nombreImagen: string = "";
  selectedFiles: File[] = [];
  @ViewChild('fotito')
  public imagenesTest!: ElementRef<HTMLInputElement>;
  public fotos: File[] = [];
  public async subirFoto() {



    //onst blob = await this.convertFileListToBlob(this.imagenesTest.nativeElement.files!);
    //console.log(this.imagenesTest.nativeElement.files);
    //console.log(blob);



    this.ServicioFoto.subirFoto(this.imagenesTest.nativeElement.files!).subscribe(data => {
      //console.log(data);
    });

  }


  // Función para convertir FileList en un objeto Blob
  convertFileListToBlob(fileList: FileList): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const file = fileList[0]; // Suponemos que estás tratando con un solo archivo
      if (file) {
        const blob = new Blob([file], { type: file.type });
        resolve(blob);
      } else {
        reject(new Error('No se seleccionó ningún archivo.'));
      }
    });
  }


  arrayImagenes: string[] = [];

  onFileChange(event: any) {
    this.selectedFiles = event.target.files;
  }

  async uploadImages() {
    if (this.selectedFiles.length > 0) {
      (await this.ServicioFoto.uploadImages(this.selectedFiles))
        .subscribe(response => {
          //console.log('Imágenes cargadas exitosamente:', response);
          response.forEach((imgBinario: { datos: any; }) => {



            //console.log(imgBinario);
            // this.arrayImagenes.push(this.getImageUrl(imgBinario));
            //console.log(imgBinario.datos);
            this.arrayImagenes.push(`data:image/jpeg;base64,${imgBinario.datos}`);
            // this.convertJsonToBase64(imgBinario).then((base64String) => {
            //   console.log('MONO');
            //   console.log(base64String);
            // });



            // this.arrayImagenes.push(this.getImageUrl2(imgBinario));
            // console.log(this.arrayImagenes);
          });

        }, error => {
          console.error('Error al cargar imágenes:', error);
        });
    }
  }
  // getImageUrl(imageData: any): string {
  //   const blob = new Blob([/* Blob data, if available */], { type: imageData.contentType });
  //   return URL.createObjectURL(blob);
  // }

  // getImageUrl2(imageData: any): string {
  //   const base64Data = "base64-encoded-image-data"; // Reemplaza con los datos en base64 de la imagen
  //   const imageUrl = `data:${imageData.contentType};base64,${base64Data}`;
  //   return imageUrl;
  // }

  // convertJsonToBase64(jsonData: any): Promise<string> {
  //   return new Promise<string>((resolve) => {
  //     // Suponiendo que tienes el objeto JSON almacenado en una variable llamada "jsonData"
  //     const contentType = jsonData.contentType;
  //     const responseHeaders = jsonData.headers;
  //     const base64Data = "base64-encoded-image-data"; // Reemplaza esto con los datos reales en base64

  //     const base64String = `data:${contentType};base64,${base64Data}`;
  //     resolve(base64String);
  //   });
  // }
  recuperarImagen() {
    // alert(this.nombreImagen);
    this.ServicioFoto.recuperarFoto(this.nombreImagen)
      .subscribe(imgBinario => {

        // const base64String = btoa(String.fromCharCode.apply(null, imgBinario.datos));
        //  console.log(imgBinario);
        this.arrayImagenes.push(`data:image/jpeg;base64,${imgBinario.fileContents}`);

      }, error => {
        //    console.error('Error al cargar imágenes:', error);
      });


  }


}
