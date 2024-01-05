// pagos.component.ts
import { Component, OnInit, AfterViewInit, SimpleChanges, ViewChild } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { objOrderDataProducto } from 'src/app/interfaces/DTOsCarritoYProcesoDeCompra/DTOOrderData.interface';
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
  tipoEnvio: string = 'paraEnviar';
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
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      departamento: new FormControl(''),
      ciudad: new FormControl(''),
      barrio: new FormControl(''),
      direccion: new FormControl(''),
      mail: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
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
      this.total += element.precio;
    });
  }


  processPayment() {
    this.preferenceId = '128881622-a6b63cf1-2a58-42ed-a798-0c6c769c8935';
    this.mp.bricks().create("wallet", "payment-container", {
      initialization: {
        preferenceId: '128881622-a6b63cf1-2a58-42ed-a798-0c6c769c8935'
      },
    });

  }
}