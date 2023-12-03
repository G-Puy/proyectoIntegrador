import { AfterViewInit, Inject } from '@angular/core';
import Swiper from 'swiper';

import { Component } from '@angular/core';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { DTOStockEnvio } from 'src/app/interfaces/DTOsEnvio/stockEnvioDTO.interface';
import { SharedService } from 'src/app/shared/shared.service';
import { DTOProductoEnvio } from 'src/app/interfaces/DTOsEnvio/productoEnvioDTO.interface';
import { AddEditGenericoComponent } from 'src/app/components/add-edit-generico/add-edit-generico.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DTOTalleEnvio } from 'src/app/interfaces/DTOsEnvio/talleEnvioDTO.interface';
import { DTOColorEnvio } from 'src/app/interfaces/DTOsEnvio/colorEnvioDTO.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
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
  enviarStock: DTOStockEnvio[] = [];
  opcion: string = "ninguna";
  precioOferta = 0;
  txtAreaDescripcion: string = "";
  txtAreaGuiaTalles: string = "";
  visibleEnWeb: boolean = true;
  productoEnviar: DTOProductoEnvio = {
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
    }, // Puedes poner aquí un array de DTOStock
    // Esto sería un array vacío o con objetos File según sea necesario
  };

  archivos: File[] = [];
  seleccionTalles: DTOGenAbms[] = [];
  seleccionColores: DTOGenAbms[] = [];
  cargaTiposDePrenda: DTOGenAbms[] = [];
  cargaTalles: DTOGenAbms[] = [];
  cargaColores: DTOGenAbms[] = [];
  cargarStock: boolean = false;


  //TODO: ELIMINAR ESTE METODO
  mostrarOpcion() {

  }
  constructor(private sharedServ: SharedService,
    public dialogRef: MatDialogRef<AddEditGenericoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private funcionesGlobalesService: FuncionesGlobalesService) {

    this.sharedServ.getAllTalles().subscribe(talles => {
      this.cargaTalles = talles;
    });
    this.sharedServ.getAllColores().subscribe(colores => {
      this.cargaColores = colores;
    });
    this.sharedServ.getAllTipoPrendas().subscribe(tp => {
      this.cargaTiposDePrenda = tp;
    });

    console.log(data.soyAgregar);

    if (data.soyAgregar == false) {
      //Cargo los datos del producto
    }







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
    if (this.iteradorImg + 1 == this.silderImages.length) {
      this.iteradorImg = 0;
    }
    else {
      this.iteradorImg++;
    }
  }
  silderImages: string[] = [];
  fileError: string = "";
  onFileChange(event: any) {
    // Vaciamos el arreglo para nuevos archivos
    this.silderImages = [];
    this.fileError = "";
    // Casting del evento para acceder a los archivos
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.archivosSeleccionados = input.files;
      this.archivos = event.target.files;
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

  public realizarAccion() {
    this.accionProducto();
  }
  private accionProducto() {
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
      //*INCIALIZO STOCKS en 0 cantidad
      if (this.productoEnviar.stock.cargado == false) {
        this.inicializarStockConLoSeleccionado();
      }
      const formData = new FormData();
      for (let archivo of this.archivos) {
        formData.append('imagenes', archivo, archivo.name);
      }
      formData.append('producto', JSON.stringify(this.productoEnviar));

      this.agregarOModificar(formData);
    }
  }

  private agregarOModificar(dataEnvio: FormData) {
    if (this.data.soyAgregar == true) {
      this.sharedServ.altaProducto(dataEnvio).subscribe({
        next: (resultadoAlta) => {
          // Si la llamada es exitosa, cerrar el diálogo con el resultado
          if (resultadoAlta) {
            this.dialogRef.close({ result: resultadoAlta, error: "" });
          } else {
            this.dialogRef.close({ result: resultadoAlta, error: "No se pudo realizar el alta" });
          }
        },
        error: (error) => {
          // En caso de error, cerrar el diálogo con el error
          //this.dialogRef.close({ result: false, error: "Error en el alta." });
        }
      });

    }
  }

  public inicializarStockConLoSeleccionado() {
    //*CARGA STOCKS
    if (this.productoEnviar.stock.cargado == false) {
      //*CARGA STOCKS
      this.productoEnviar.stock.talles = [];
      for (let index = 0; index < this.seleccionTalles!.length; index++) {
        const talleActual = this.seleccionTalles![index];
        let unTalle: DTOTalleEnvio = {
          id: talleActual.id,
          nombreTalle: talleActual.nombre,
          idProducto: -0,
          cantidad: 0,
          colores: [],
        }
        for (let i = 0; i < this.seleccionColores.length; i++) {
          const colorActual = this.seleccionColores[i];
          let unColor: DTOColorEnvio = {
            id: colorActual.id,
            cantidad: 0,
            nombreColor: colorActual.nombre
          }
          unTalle.colores.push(unColor);
        }
        this.productoEnviar.stock.talles.push(unTalle);
      }
      this.productoEnviar.stock.cargado = true;
    } else if (this.cargarStock == true) {
      //*CARGA STOCKS
      this.productoEnviar.stock.talles = [];

      for (let index = 0; index < this.seleccionTalles!.length; index++) {
        const talleActual = this.seleccionTalles![index];
        let unTalle: DTOTalleEnvio = {
          id: talleActual.id,
          nombreTalle: talleActual.nombre,
          idProducto: -0,
          cantidad: 0,
          colores: [],
        }
        for (let i = 0; i < this.seleccionColores.length; i++) {
          const colorActual = this.seleccionColores[i];
          let unColor: DTOColorEnvio = {
            id: colorActual.id,
            cantidad: 0,
            nombreColor: colorActual.nombre
          }
          unTalle.colores.push(unColor);
        }
        this.productoEnviar.stock.talles.push(unTalle);
      }
      this.productoEnviar.stock.cargado = true;
    }

  }

  //#region  //*CARGAR STOCK PARA ENVIAR
  validarCargaStock(): boolean {
    let valido: boolean = false;
    if (this.cargarStock == true) { valido = true; }
    return valido;
  }

  validarVisualizacionCargarStock(): boolean {
    let valido: boolean = false;
    if (this.data.soyAgregar == true) {
      if (this.seleccionTalles.length > 0) {
        if (this.seleccionColores.length > 0) {
          valido = true;
        }
      }
    } else {
      valido = false;
    }
    return valido;
  }

  //#endregion //*CARGAR STOCK PARA ENVIAR







  //#endregion PARA ENVIAR







}