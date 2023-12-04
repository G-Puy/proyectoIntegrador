import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { recibirProductoDTOBack } from 'src/app/interfaces/DTOsTraerTodosBack/recibirProductoDTOBack.interface';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;
  dataSource: MatTableDataSource<recibirProductoDTOBack>;
  displayedColumns: string[] = ['id', 'producto', 'foto', 'tipo', 'editar'];
  dataSourceOriginal: recibirProductoDTOBack[] = [];
  parametroFiltrado: string = "";
  opcionBusqueda: string = "";
  constructor(public dialog: MatDialog,
    private funcionesGlobalesService: FuncionesGlobalesService,
    private sharedServ: SharedService
  ) {
    this.traerTodasLosProductos();
    // este array va a ser sumplantado por el servicio necesario segun orgien.
    this.dataSource = new MatTableDataSource(this.dataSourceOriginal);

  }
  ngOnInit(): void {


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
    return `data:image/${producto.imagenes[0].nomExtensionbre};base64,${producto.imagenes[0].imagen}`;
  }



  filtrar() {
    if (this.parametroFiltrado != "") {
      const resultadoFiltrado = this.dataSourceOriginal.filter(elemento =>
        elemento.nombre.toLowerCase().includes(this.parametroFiltrado.toLowerCase())
      );
      this.dataSource = new MatTableDataSource(resultadoFiltrado);
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.dataSourceOriginal);
      this.dataSource.sort = this.sort;
    }
  }
}
