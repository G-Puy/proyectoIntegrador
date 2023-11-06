import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import { AddEditGenericoComponent } from '../add-edit-generico/add-edit-generico.component';
import { FuncionesGlobalesService } from 'src/app/shared/funciones-globales.service';
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
  @Input() textoSeccion!: string;
  textoBtn: string = "Agregar nuevo";
  muestroBuscador: boolean = false;

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
  constructor(public dialog: MatDialog,
    private funcionesGlobalesService: FuncionesGlobalesService) {
    // este array va a ser sumplantado por el servicio necesario segun orgien.
    this.dataSourceOriginal = this.ELEMENT_DATA;
  }


  ngOnInit() {
    switch (this.seccionOrigen) {

      case 'tipoprenda':
        this.muestroBuscador = true;
        //Traigo datasource de tipos de prendas

        break;
    }
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

  abrirDialogAgregar() {
    const datos = {
      seccionOrigen: this.seccionOrigen
    };

    const dialogRef = this.dialog.open(AddEditGenericoComponent, {
      width: '250px',
      data: {
        origen: this.seccionOrigen,
        editar: false,
        textoMostrar: "Agregar nuevo tipo de prenda",
        textoDelObjeto: ""
      }
    });
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado == true) {
        this.funcionesGlobalesService.abrirSnack("El alta fue exitosa.", 3000, true);
      } else {
        this.funcionesGlobalesService.abrirSnack("Error al realizar el alta.", 3000, false);
      }
      /* this.metodoDespuesDeCerrarDialogo(resultado); */
    });

  }

  abrirDialogEditar(obj: any) {
    //console.log("Vamos a editar el objeto ----> " + obj);
    this.funcionesGlobalesService.abrirSnack("El alta fue exitosa.", 0, true);
  }
}
