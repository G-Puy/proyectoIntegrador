import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface Element {
  nombreTipoPrenda: string;
}
@Component({
  selector: 'app-lista-con-buscador-generica',
  templateUrl: './lista-con-buscador-generica.component.html',
  styleUrls: ['./lista-con-buscador-generica.component.css']
})
export class ListaConBuscadorGenericaComponent implements OnInit {
  @Input() seccionOrigen!: string;


  ELEMENT_DATA: Element[] = [
    { nombreTipoPrenda: 'Top' },
    { nombreTipoPrenda: 'Mini' },
    { nombreTipoPrenda: 'Pantalon' },
    { nombreTipoPrenda: 'Pantalon' }
  ];
  parametroFiltrado: string = "";
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;

  displayedColumns: string[] = ['nombreTipoPrenda', 'eliminar', 'editar'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSourceOriginal;
  constructor() {
    // este array va a ser sumplantado por el servicio necesario segun orgien.

    this.dataSourceOriginal = this.ELEMENT_DATA;
  }
  ngOnInit() {

    this.dataSource.sort = this.sort;
    this.dataSource.sort.active = 'nombreTipoPrenda';
    this.dataSource.sort.direction = 'asc';
  }
  filtrar() {
    if (this.parametroFiltrado != "") {
      const resultadoFiltrado = this.ELEMENT_DATA.filter(elemento =>
        elemento.nombreTipoPrenda.toLowerCase().includes(this.parametroFiltrado.toLowerCase())
      );
      this.dataSource = new MatTableDataSource(resultadoFiltrado);
      this.dataSource.sort = this.sort;
    } else {
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      this.dataSource.sort = this.sort;
    }
  }
}
