// pagos.component.ts
import { Component, OnInit, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { objOrderData, objOrderDataProducto } from 'src/app/interfaces/DTOsCarritoYProcesoDeCompra/DTOOrderData.interface';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { objCarritoYProcesoDeCompra } from 'src/app/interfaces/DTOsCarritoYProcesoDeCompra/DTOCarritoYProcesoDeCompra.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

declare var MercadoPago: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit, AfterViewInit {
  personaForm: FormGroup;
  orderList: objOrderDataProducto[] = [];
  orderDataEnvio: objOrderData | undefined;
  tipoEnvio: string = 'retira';
  preferenceId: string = '';
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<objCarritoYProcesoDeCompra>;
  productosDelCarrito: objCarritoYProcesoDeCompra[] = [];
  displayedColumns: string[] = ['nombreProducto', 'precio', 'cantidad'];
  total: number = 0;
  public mp = new MercadoPago('TEST-583f205e-a018-4414-94c5-fc9d00faf360', {
    locale: 'es-UY'
  });

  constructor(private sharedService: SharedService) {
    this.personaForm = new FormGroup({
      nombre: new FormControl('n', Validators.required),
      apellido: new FormControl('a', Validators.required),
      departamento: new FormControl(''),
      ciudad: new FormControl(''),
      barrio: new FormControl(''),
      direccion: new FormControl(''),
      mail: new FormControl('m', Validators.required),
      telefono: new FormControl('t', Validators.required),
    });
    this.dataSource = new MatTableDataSource(this.productosDelCarrito);

  }
  ngOnChanges(): void {
    console.log("Entro a cambios");
    this.personaForm.reset();
    // Revisa si 'tipoEnvio' ha cambiado

    if (this.tipoEnvio === 'paraEnviar') {
      this.personaForm.get('departamento')?.setValidators(Validators.required);
      this.personaForm.get('ciudad')?.setValidators(Validators.required);
      this.personaForm.get('barrio')?.setValidators(Validators.required);
      this.personaForm.get('direccion')?.setValidators(Validators.required);
    } else {
      this.personaForm.get('departamento')?.clearValidators();
      this.personaForm.get('ciudad')?.clearValidators();
      this.personaForm.get('barrio')?.clearValidators();
      this.personaForm.get('direccion')?.clearValidators();
    }

  }



  ajustarValidaciones(tipoEnvio: string) {
    // Campos obligatorios para 'paraEnviar'
    const camposObligatoriosParaEnviar = ['departamento', 'ciudad', 'barrio', 'direccion'];
    // Campos obligatorios comunes (para ambas opciones)
    const camposObligatoriosComunes = ['nombre', 'apellido', 'mail', 'telefono'];
    // Itera sobre los campos para 'paraEnviar'
    camposObligatoriosParaEnviar.forEach(campo => {
      const control = this.personaForm.get(campo);
      if (tipoEnvio === 'paraEnviar') {
        control!.setValidators(Validators.required);
      } else {
        control!.clearValidators();
      }
      control!.updateValueAndValidity();
    });
    // Asegúrate de que los campos comunes siempre tengan validación
    camposObligatoriosComunes.forEach(campo => {
      const control = this.personaForm.get(campo);
      control!.setValidators(Validators.required);
      control!.updateValueAndValidity();
    });
  }
  ngOnInit(): void {
    this.cargarProductosDeLocalStorage();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  private cargarProductosDeLocalStorage() {
    this.productosDelCarrito = this.sharedService.obtenerCarrito();
    this.dataSource = new MatTableDataSource(this.productosDelCarrito);
    this.productosDelCarrito.forEach(element => {
      this.total += element.precio * element.cantidad;
    });
  }


  processPayment() {
    //*Construir el obj para enviar 

    this.orderDataEnvio = {
      datosPersona: {
        nombre: '',
        apellido: '',
        departamento: '',
        ciudad: '',
        barrio: '',
        direccion: '',
        mail: '',
        telefono: '',
        enviar: false // inicializa con un valor por defecto
      },
      datosProductos: [] // inicializa como un arreglo vacío
    };
    //*Construir los datos de la persona
    let enviar = this.tipoEnvio !== 'retira' ? true : false;
    this.orderDataEnvio!.datosPersona.nombre = this.personaForm.get('nombre')!.value;
    this.orderDataEnvio!.datosPersona.apellido = this.personaForm.get('apellido')!.value;
    this.orderDataEnvio!.datosPersona.departamento = this.personaForm.get('departamento')!.value;
    this.orderDataEnvio!.datosPersona.ciudad = this.personaForm.get('ciudad')!.value;
    this.orderDataEnvio!.datosPersona.barrio = this.personaForm.get('barrio')!.value;
    this.orderDataEnvio!.datosPersona.direccion = this.personaForm.get('direccion')!.value;
    this.orderDataEnvio!.datosPersona.mail = this.personaForm.get('mail')!.value;
    this.orderDataEnvio!.datosPersona.telefono = this.personaForm.get('telefono')!.value;
    this.orderDataEnvio!.datosPersona.enviar = enviar;
    //*Cargar la lista de productos para back
    this.productosDelCarrito.forEach(producto => {
      let productoAdd: objOrderDataProducto = {
        id: producto.idProducto,
        idColor: producto.color.id,
        idTalle: producto.talle.id,
        cantidad: producto.cantidad
      };
      this.orderDataEnvio!.datosProductos.push(productoAdd);
    });

    this.sharedService.createPaymentPreference(this.orderDataEnvio!)
      .subscribe({
        next: (codigo) => {
          console.log(codigo);
          if (codigo != null && codigo != undefined && codigo != '') {
            this.mp.bricks().create("wallet", "payment-container", {
              initialization: {
                preferenceId: codigo
              },
            });
          }
        },
        error: (error) => {
          console.log(error);
          // Manejo de errores
          // Si hubo un error con la petición, lo manejas aquí
        }
      });
  }
}