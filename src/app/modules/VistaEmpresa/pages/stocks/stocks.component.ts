import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DTOStockEnvio } from 'src/app/interfaces/DTOsEnvio/stockEnvioDTO.interface';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { DTOGenAbms } from 'src/app/interfaces/objGenericoParaABMS.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';
import { EditarstockComponent } from './editarstock/editarstock.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  tipoPrenda: string = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;
  dataSource: MatTableDataSource<recibirProductoDTOBack>;
  displayedColumns: string[] = ['foto', 'producto', 'cantidad', 'tipo', 'editar'];
  dataSourceOriginal: recibirProductoDTOBack[] = [];
  parametroFiltrado: string = "";
  opcionBusqueda: string = "Nombre";
  constructor(public dialog: MatDialog,
    private funcionesGlobalesService: FuncionesGlobalesService,
    private sharedServ: SharedService
  ) {
    this.traerTodasLosProductos();
    this.cargarTP();
    // este array va a ser sumplantado por el servicio necesario segun orgien.
    this.dataSource = new MatTableDataSource(this.dataSourceOriginal);

  }
  ngOnInit(): void {


  }
  cargaTiposDePrenda: DTOGenAbms[] = [];


  private cargarTP() {
    this.sharedServ.getAllTipoPrendas().subscribe(tp => {
      this.cargaTiposDePrenda = tp;
    });

  }
  private traerTodasLosProductos() {
    this.dataSourceOriginal = [];
    this.sharedServ.traerTodosLosProductos().subscribe(data => {
      if (data) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.dataSourceOriginal.push(element);
        }

        console.log(this.dataSourceOriginal);
        // Aquí asignas el resultado a dataSource y puedes usar sort
        this.dataSource = new MatTableDataSource(this.dataSourceOriginal); // Asegúrate de que esto es MatTableDataSource
        this.dataSource.sort = this.sort;
        // Opcional: Si deseas establecer el orden predeterminado
        this.dataSource.sort.active = 'nombre';
        this.dataSource.sort.direction = 'asc';
      }
    }, error => {
      console.error('Error al cargar la imagen:', error);
    });
  }
  public cargarSrc(producto: recibirProductoDTOBack): string {
    return `data:image/${producto.imagenes[0].extension};base64,${producto.imagenes[0].imagen}`;
  }
  public cantidad(stock: DTOStockEnvio): number {
    return stock.cantidad;
  }


  filtrar() {
    if (this.parametroFiltrado != "" || this.tipoPrenda != "") {
      switch (this.opcionBusqueda) {
        case 'Id':
          const resultadoFiltradoId = this.dataSourceOriginal.filter(elemento =>
            elemento.id.toString().includes(this.parametroFiltrado.toString())
          );
          this.dataSource = new MatTableDataSource(resultadoFiltradoId);
          this.dataSource.sort = this.sort;
          break;
        case 'Nombre':
          const resultadoFiltradoNombre = this.dataSourceOriginal.filter(elemento =>
            elemento.nombre.toLowerCase().includes(this.parametroFiltrado.toLowerCase())
          );
          this.dataSource = new MatTableDataSource(resultadoFiltradoNombre);
          this.dataSource.sort = this.sort;
          break;
        case 'Tipo':
          const resultadoFiltradoTipo = this.dataSourceOriginal.filter(elemento =>
            elemento.tipoProductoNombre.toLowerCase().includes(this.tipoPrenda.toLowerCase())
          );
          this.dataSource = new MatTableDataSource(resultadoFiltradoTipo);
          this.dataSource.sort = this.sort;
          break;
      }
    }

    else {
      this.dataSource = new MatTableDataSource(this.dataSourceOriginal);
      this.dataSource.sort = this.sort;
    }
  }

  vaciarFiltros() {
    this.dataSource = new MatTableDataSource(this.dataSourceOriginal);
    this.dataSource.sort = this.sort;
  }
  public openDialogEditarStock(stock: DTOStockEnvio): void {


    const dialogRef = this.dialog.open(EditarstockComponent, {
      width: this.funcionesGlobalesService.tamMaxDialogMobile(),
      data: { stockCompleto: stock },
      disableClose: true  // Esto evita que el diálogo se cierre al hacer clic fuera de él
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.error != "") {
        this.funcionesGlobalesService.abrirSnack(result.error, 2000, false);
      } else if (result.result == true) {
        this.funcionesGlobalesService.abrirSnack("Operación exitosa.", 2000, true);
        this.traerTodasLosProductos();
      }
    });

  }

}
