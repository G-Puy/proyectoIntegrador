import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarFotoServiceService {

  constructor(private http: HttpClient) { }


  public subirFoto(fotito: FileList): Observable<any> {
    //return this.http.post<any>('http://localhost:7215/api/categorias/subirIMG', fotito);

    let dtoCatFront: any = {
      nombreCategoria: "Pantalon4"
    }
    return this.http.post<any>('https://localhost:7215/api/categorias/altaCategoria', dtoCatFront);
  }
  subirFoto2(fotito: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('fotito', fotito, 'nombre-del-archivo.extension');

    return this.http.post<any>('https://localhost:7215/api/categorias/subirIMG', formData);
  }




  async uploadImages(files: File[]): Promise<Observable<any>> {
    const formData = new FormData();

    for (const file of files) {
      const compressedImage = await this.compressImage(file);
      formData.append('imagenes', compressedImage, file.name);
    }

    return this.http.post<any[]>('https://localhost:7215/api/categorias/subirIMG', formData);
  }



  async compressImage(file: File): Promise<Blob> {
    return new Promise<Blob>((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxWidth = 600; // Ajusta el ancho máximo según tus necesidades
          const scaleFactor = maxWidth / img.width;

          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;

          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            resolve(blob as Blob);
          }, file.type, 0.7); // Ajusta la calidad de compresión según tus necesidades
        };
      };

      reader.readAsDataURL(file);
    });
  }


  recuperarFoto(nombreImagen: string) {
    return this.http.get<any>('https://localhost:7215/api/categorias/ObtenerImagen?nombreImagen=' + nombreImagen);
  }
}
